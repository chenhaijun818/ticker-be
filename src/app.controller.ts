import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Model } from "mongoose";
import { TodoDocument } from "./models/todo";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import { UserDocument } from "./models/user";
import { sign } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>,
              @InjectModel("Todo") private todo: Model<TodoDocument>,
              private http: HttpService,
              private config: ConfigService,
  ) {
  }

  @Post("login")
  async login(@Body() body) {
    const res: any = await this.http.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wxa439ae89777408fa&secret=5b063f65733762003260e8caccb3a02b&js_code=${body.code}&grant_type=authorization_code`).toPromise();
    const { openid } = res.data;
    let user = await this.userModel.findOne({ openid }).exec();
    // 用户不存在，则直接创建
    if (!user) {
      user = await this.userModel.create({
        openid,
      });
    }
    const salt = this.config.get("jwtSalt");
    const token = sign({ openid, uid: user._id }, salt, { expiresIn: "7d" });
    return {
      code: 200,
      data: { token },
      message: "success",
    };
  }

  @Post("add")
  addTodo(@Body() body, @Req() req) {
    console.log(req.user);
    this.todo.create({
      name: body.name,
      pid: body.pid,
      uid: req.user.uid
    });
    return {
      code: 200,
      data: {},
      message: "success",
    };
  }

  @Post("delete")
  async removeTodo(@Body() body) {
    const res = await this.todo.findByIdAndRemove(body.id);
    return {
      code: 200,
      data: res,
      message: "success",
    };
  }

  @Get("todoList")
  async getTodoList(@Req() req) {
    console.log(req.user);
    const list = await this.todo.find({uid: req.user.uid});
    return {
      code: 200,
      data: { list },
      message: "success",
    };
  }

  @Get("test")
  test() {
    console.log("test");
  }
}
