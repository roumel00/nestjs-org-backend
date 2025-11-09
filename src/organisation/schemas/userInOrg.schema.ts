import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInOrgDocument = UserInOrg & Document;

@Schema({ timestamps: true })
export class UserInOrg {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 'member' })
  role: 'owner' | 'admin' | 'member';

  @Prop({ required: true, default: 'active' })
  status: 'pending' | 'active';

  @Prop({ type: Date, required: false, default: null })
  createdAt: Date | null;

  @Prop({ type: Date, required: false, default: null })
  updatedAt: Date | null;
}

export const UserInOrgSchema = SchemaFactory.createForClass(UserInOrg);
