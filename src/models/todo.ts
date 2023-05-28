import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo extends Document {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  time: number;
  @Prop()
  enable: boolean;
  @Prop()
  pid: string;
  @Prop()
  uid: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);