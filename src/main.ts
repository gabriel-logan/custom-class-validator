import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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

  const port = 3000;

  await app.listen(port);
}

void bootstrap();
