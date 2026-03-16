import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema({ timestamps: true, collection: 'teamMember' })
export class TeamMember {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: String, required: false, default: null })
  userId: string | null;

  @Prop({ required: true, default: 'member' })
  role: 'owner' | 'admin' | 'member' | 'invitee';

  @Prop({ type: String, required: false, default: null })
  name: string | null;

  @Prop({ type: String, required: false, default: null })
  image: string | null;

  @Prop({ type: Date, required: false, default: null })
  deletedAt: Date | null;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

TeamMemberSchema.index({ workspaceId: 1, deletedAt: 1 });
TeamMemberSchema.index({ userId: 1, workspaceId: 1, deletedAt: 1 });
TeamMemberSchema.index({ email: 1, workspaceId: 1, deletedAt: 1 });
