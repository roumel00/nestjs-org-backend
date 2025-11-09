import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InviteInOrgDocument = InviteInOrg & Document;

@Schema({ timestamps: true, collection: 'inviteInOrg' })
export class InviteInOrg {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 'member' })
  role: 'admin' | 'member';

  @Prop({ type: Date, required: false, default: null })
  deletedAt: Date | null;
}

export const InviteInOrgSchema = SchemaFactory.createForClass(InviteInOrg);
