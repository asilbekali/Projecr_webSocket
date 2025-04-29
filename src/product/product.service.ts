import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: 'name' | 'price',
    order: 'asc' | 'desc',
  ) {
    const skip = (page - 1) * limit;
    const total = await this.prisma.product.count();
    const products = await this.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });
    return {
      total,
      page,
      limit,
      products,
    };
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
