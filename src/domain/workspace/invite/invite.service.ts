import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Workspace, WorkspaceDocument } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { getDb } from '@config/database.js';
import { sendInviteEmail } from '@config/email.js';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async invite(email: string, workspaceId: string, actor: { id: string; name: string | null }) {
    // Get workspace name for email
    const workspace = await this.workspaceModel.findById(workspaceId).exec();

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const db = await getDb();

    const user = await db.collection('user').findOne({ email });

    if (user) {
      // Check if user is already in this workspace
      const existingTeamMember = await this.teamMemberModel.findOne({
        userId: user._id.toString(),
        workspaceId: workspaceId,
        deletedAt: null,
      }).exec();

      if (existingTeamMember) {
        throw new Error('User is already a member of this workspace');
      }

      // Check if there's an existing invite for this email and convert it
      const existingInvite = await this.teamMemberModel.findOne({
        email,
        workspaceId: workspaceId,
        userId: null,
        deletedAt: null,
      }).exec();

      let savedTeamMember: TeamMemberDocument | null;
      if (existingInvite) {
        // Convert invite to member by updating userId, role, and user data
        await this.teamMemberModel.updateOne(
          { _id: existingInvite._id },
          { $set: {
            userId: user._id.toString(),
            role: 'member',
            name: user.name ?? null,
            image: user.image ?? null,
          } }
        ).exec();
        savedTeamMember = await this.teamMemberModel.findById(existingInvite._id).exec();
      } else {
        // Create new teamMember as member (existing user accepts immediately)
        const teamMember = new this.teamMemberModel({
          workspaceId,
          email,
          userId: user._id.toString(),
          role: 'member',
          name: user.name ?? null,
          image: user.image ?? null,
        });
        savedTeamMember = await teamMember.save();
      }

      if (!savedTeamMember) {
        throw new Error('Failed to create or update team member');
      }

      // Send email to existing user
      await sendInviteEmail({
        email,
        workspaceName: workspace.name,
        role: 'member',
        existingUser: true,
      });

      this.eventEmitter.emit('notification.invite_sent', {
        workspaceId,
        actorId: actor.id,
        actorName: actor.name,
        inviteeEmail: email,
      });

      return savedTeamMember;
    } else {
      // Check if there's already an invite for this email
      const existingInvite = await this.teamMemberModel.findOne({
        email,
        workspaceId: workspaceId,
        userId: null,
        deletedAt: null,
      }).exec();

      if (existingInvite) {
        throw new Error('Invite already exists for this email');
      }

      const teamMember = new this.teamMemberModel({
        workspaceId,
        email,
        userId: null,
        role: 'invitee',
      });

      const savedTeamMember = await teamMember.save();

      // Send email to new user with signup link
      await sendInviteEmail({
        email,
        workspaceName: workspace.name,
        role: 'invitee',
        existingUser: false,
      });

      this.eventEmitter.emit('notification.invite_sent', {
        workspaceId,
        actorId: actor.id,
        actorName: actor.name,
        inviteeEmail: email,
      });

      return savedTeamMember;
    }
  }
}
