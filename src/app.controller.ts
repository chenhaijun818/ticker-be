import { Body, Controller, Get, Post } from "@nestjs/common";
import { Model } from "mongoose";
import { TodoDocument } from "./models/todo";
import { InjectModel } from "@nestjs/mongoose";
import { nanoid } from "nanoid";


@Controller()
export class AppController {
  constructor(@InjectModel("Todo") private todo: Model<TodoDocument>) {
  }

  @Post("add")
  addTodo(@Body() body) {
    const id = nanoid(8);
    this.todo.create({
      id,
      name: body.name,
      pid: body.pid,
    });
    return {
      code: 200,
      data: {},
      message: "success",
    };
  }

  @Get("todoList")
  async getTodoList() {
    const list = await this.todo.find();
    return {
      code: 200,
      data: { list },
      message: "success",
    };
  }
}
