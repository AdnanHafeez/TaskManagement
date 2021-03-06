import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({origin:config.get('server').origin});
  }
  
  const port = config.get('server').port;
  await app.listen(port);
  console.log(`Application listening on port:${port}`);
}
bootstrap();
