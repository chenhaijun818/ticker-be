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
  pid: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);