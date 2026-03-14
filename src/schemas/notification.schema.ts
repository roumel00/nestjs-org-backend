import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true, collection: 'notification' })
export class Notification {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  context: Record<string, unknown>;

  @Prop({ required: true, default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ recipientId: 1, orgId: 1, read: 1, createdAt: -1 });
