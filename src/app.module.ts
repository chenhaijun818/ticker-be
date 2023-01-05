import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./models/todo";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ticker'),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
