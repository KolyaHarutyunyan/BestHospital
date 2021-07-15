import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerUtil {
  setupSwagger = (app) => {
    const options = new DocumentBuilder()
      .setTitle('Polo TMS API')
      .setVersion('1.0.0')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/api-doc', app, swaggerDocument);
  };
}
