import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from "node:fs";
import path from "node:path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    httpsOptions: {
      key: fs.readFileSync(path.join(__dirname, '../src/certs/traco.key')),
      cert: fs.readFileSync(path.join(__dirname, '../src/certs/traco.pem'))
    }
  });
  app.enableCors();
  await app.listen(3100);
}
bootstrap();
