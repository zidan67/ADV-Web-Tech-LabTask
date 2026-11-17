import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './product/product.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ProductModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zidanislam',
      password: 'admin',
      database: 'product_inventory_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
