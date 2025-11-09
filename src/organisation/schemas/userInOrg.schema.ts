import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInOrgDocument = UserInOrg & Document;

@Schema({ timestamps: true, collection: 'userInOrg' })
export class UserInOrg {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 'member' })
  role: 'owner' | 'admin' | 'member';

  @Prop({ type: Date, required: false, default: null })
  deletedAt: Date | null;
}

export const UserInOrgSchema = SchemaFactory.createForClass(UserInOrg);
