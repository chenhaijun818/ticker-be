import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();
    const authorization = req.headers["authorization"];
    if (authorization) {
      const [_, token] = authorization.split(".");
      const userInfoStr = atob(token);
      req.user = JSON.parse(userInfoStr)
    }
    return next.handle();
  }
}
