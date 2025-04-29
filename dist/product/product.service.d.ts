import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: string;
        price: number;
    }>;
    findAll(page: number, limit: number, sortBy: 'name' | 'price', order: 'asc' | 'desc'): Promise<{
        total: number;
        page: number;
        limit: number;
        products: {
            name: string;
            id: string;
            price: number;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        price: number;
    } | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: string;
        price: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        price: number;
    }>;
}
