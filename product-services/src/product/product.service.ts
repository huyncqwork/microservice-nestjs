import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entity/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  // async findByIdGrpc(id: number) {
  //   const product = await this.productRepository.findOne({ where: { id } });

  //   if (!product) {
  //     throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  //   }

  //   return {
  //     id: product.id,
  //     images: product.images,
  //     name_product: product.name_product,
  //     price: product.price,
  //     description: product.description,
  //     status: product.status,
  //   };
  // }

  async deleteProduct(id: number) {
    await this.findById(id);
    await this.productRepository.delete(id);
    return null;
  }

  // async updateProduct(id: number, updateProductDto: UpdateProductDto) {
  //   await this.findById(id);
  //   const { images, name_product, price, description } = updateProductDto;
  //   const isNameProductExists = await this.productRepository.exists({
  //     where: {
  //       name: name_product,
  //     },
  //   });

  //   if (isNameProductExists) {
  //     throw new HttpException(
  //       'Name product already exists',
  //       HttpStatus.CONFLICT,
  //     );
  //   }

  //   await this.productRepository.update(
  //     {
  //       product_id: id,
  //     },
  //     {
  //       images,
  //       name: name_product,
  //       price,
  //       description,
  //     },
  //   );

  //   const productUpdated = this.findById(id);
  //   return productUpdated;
  // }
  async findById(id: number) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
  async createProduct(createProductDto: CreateProductDto) {
    const { sku, name, images, price, category_id, description } =
      createProductDto;
    const isNameProductExists = await this.productRepository.exists({
      where: {
        name,
      },
    });

    if (isNameProductExists) {
      throw new HttpException(
        'Name product already exists',
        HttpStatus.CONFLICT,
      );
    }

    const product_created = await this.productRepository.save(
      this.productRepository.create({
        sku,
        name,
        images,
        price,
        category_id,
        description,
      }),
    );

    return product_created;
  }

  async getAll() {
    return await this.productRepository.find();
  }
}
