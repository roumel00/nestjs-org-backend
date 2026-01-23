import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema({ timestamps: true, collection: 'teamMember' })
export class TeamMember {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: String, required: false, default: null })
  userId: string | null;

  @Prop({ required: true, default: 'member' })
  role: 'owner' | 'admin' | 'member';

  @Prop({ type: Date, required: false, default: null })
  deletedAt: Date | null;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
