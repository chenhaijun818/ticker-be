import { Body, Controller, Get, Post } from "@nestjs/common";
import { Model } from "mongoose";
import { TodoDocument } from "./models/todo";
import { InjectModel } from "@nestjs/mongoose";

@Controller()
export class AppController {
  constructor(@InjectModel("Todo") private todo: Model<TodoDocument>) {
  }

  @Post("add")
  addTodo(@Body() body) {
    this.todo.create({
      name: body.name,
      pid: body.pid,
    });
    return {
      code: 200,
      data: {},
      message: "success",
    };
  }

  @Post('delete')
  async removeTodo(@Body() body) {
    const res = await this.todo.findByIdAndRemove(body.id);
    return {
      code: 200,
      data: res,
      message: 'success'
    }
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
