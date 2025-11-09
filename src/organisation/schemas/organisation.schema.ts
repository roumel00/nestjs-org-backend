import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganisationDocument = Organisation & Document;

@Schema({ timestamps: true })
export class Organisation {
  @Prop({ required: true })
  owner: string; // userId of the owner

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'UTC' })
  timezone: string;

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    required: false,
    default: null,
  })
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;

  @Prop({ type: String, required: false, default: null })
  abn: string | null;

  @Prop({ type: String, required: false, default: null })
  licenseNumber: string | null;

  @Prop({ type: String, required: false, default: null })
  phone: string | null;

  @Prop({ type: String, required: false, default: null })
  website: string | null;

  @Prop({ type: String, required: false, default: null })
  billingEmail: string | null;

  @Prop({ type: String, required: false, default: null })
  logo: string | null;

  @Prop({ type: Date, required: false, default: null })
  createdAt: Date | null;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
