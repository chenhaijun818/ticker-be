import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  phone: string;
  @Prop()
  email: string;

  @Prop()
  avatar: string;
  @Prop()
  desc: string;
  @Prop()
  createdTime: Date;
  @Prop()
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);