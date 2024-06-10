import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entity/products';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {


  async deleteProduct(id: number) {
    await this.findById(id);
    await this.productRepository.delete(id);
    return null;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.findById(id);
    const { images, name_product, price, quantity, description } =
      updateProductDto;
    const isNameProductExists = await this.productRepository.exists({
      where: {
        name_product,
      },
    });

    if (isNameProductExists) {
      throw new HttpException(
        'Name product already exists',
        HttpStatus.CONFLICT,
      );
    }

    await this.productRepository.update(
      {
        id,
      },
      {
        images,
        name_product,
        price,
        quantity,
        description,
      },
    );

    const productUpdated = this.findById(id);
    return productUpdated;
  }
  async findById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
  async createProduct(createProductDto: CreateProductDto) {
    const { images, name_product, price, quantity, description } =
      createProductDto;
    const isNameProductExists = await this.productRepository.exists({
      where: {
        name_product,
      },
    });

    if (isNameProductExists) {
      throw new HttpException(
        'Name product already exists',
        HttpStatus.CONFLICT,
      );
    }

    const productCreate = this.productRepository.create({
      images,
      name_product,
      price,
      quantity,
      description,
    });

    const productCreated = await this.productRepository.save(productCreate);

    return productCreated;
  }
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  async getAll() {
    return await this.productRepository.find();
  }
}
