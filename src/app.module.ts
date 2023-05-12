
import {join} from 'node:path';
import { Module } from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./models/todo";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static')
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ticker'),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
