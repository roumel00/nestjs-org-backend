import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true, collection: 'notification' })
export class Notification {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  context: Record<string, unknown>;

  @Prop({ required: true, default: false })
  read: boolean;

  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ recipientId: 1, workspaceId: 1, read: 1, createdAt: -1 });
