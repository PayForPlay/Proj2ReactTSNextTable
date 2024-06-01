import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataTableModule } from './data-table/data-table.module';
import { DatabaseModule } from './database/database.module';
import { CorsMiddleware } from './middleware/cors.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DataTableModule, DatabaseModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
