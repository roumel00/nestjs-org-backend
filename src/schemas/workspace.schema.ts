import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;

@Schema({ timestamps: true, collection: 'workspace' })
export class Workspace {
  @Prop({ required: true })
  owner: string; // userId of the owner

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'UTC' })
  timezone: string;

  @Prop({ type: String, required: false, default: null })
  logo: string | null;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
