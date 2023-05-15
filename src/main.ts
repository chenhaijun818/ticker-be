import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from "node:fs";
import path from "node:path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    httpsOptions: {
      key: fs.readFileSync(path.join(__dirname, '../certs/api.traco.tech.key')),
      cert: fs.readFileSync(path.join(__dirname, '../certs/api.traco.tech.pem'))
    }
  });
  app.enableCors();
  await app.listen(3100);
}
bootstrap();
