import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./models/todo";
import { HttpModule } from "@nestjs/axios";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { User, UserSchema } from "./models/user";
import { config } from "dotenv";
import { join } from "node:path";

config({ path: join(__dirname, "..", ".env") });

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/ticker"),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }, { name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: TokenInterceptor,
  }],
})
export class AppModule {
}
