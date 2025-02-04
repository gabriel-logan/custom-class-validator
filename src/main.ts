import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Custom Validation Pipes API")
    .setDescription("The Custom Validation Pipes API description")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, {
    customSiteTitle: "Custom Validation Pipes API",
  });

  const logger = new Logger("bootstrap");

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
  logger.debug(
    `Swagger documentation available at http://localhost:${port}/api`,
  );
  logger.debug(`Application running at http://localhost:${port}`);
  logger.verbose(`Application running in ${process.env.NODE_ENV} mode`);
}

void bootstrap();
