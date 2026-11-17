import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/product.entity.js';
import { Repository,ILike } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update.product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update.product.dto.js';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Products)
    private productsRepo : Repository <Products>){}
    async create (dto:CreateProductDto) {
        const product = this.productsRepo.create(dto);
        await this.productsRepo.save(product);
        return {
            message : "product created successfully",
            data : product,
        };
    }
    async findAll(){
        const product = await this.productsRepo.find({
            order: {createdAt :'DESC'},
        });
        return {
            message : "ALl products fetched successfuly",
            count : product.length,
            data : product,
        };

    }
   // READ ONE
  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  // PATCH - PARTIAL UPDATE
  async update(
    id: number,
    dto: PartialUpdateProductDto,
  ) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    Object.assign(product, dto);

    const updatedProduct =
      await this.productsRepo.save(product);

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  // PUT - FULL REPLACEMENT
  async replace(
    id: number,
    dto: UpdateProductDto,
  ) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    Object.assign(product, dto);

    const updatedProduct =
      await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: {
        category: ILike(category),
      },
    });

    return {
      message: 'Products fetched by category',
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: {
        name: ILike(`%${keyword}%`),
      },
    });

    return {
      message: 'Product search completed',
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    product.isActive = !product.isActive;

    const updatedProduct =
      await this.productsRepo.save(product);

    return {
      message: 'Product status changed successfully',
      data: updatedProduct,
    };
  }



}
