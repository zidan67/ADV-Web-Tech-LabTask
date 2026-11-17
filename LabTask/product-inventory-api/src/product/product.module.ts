import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductsController } from './product.controller.js';
import { Products } from './entity/product.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
