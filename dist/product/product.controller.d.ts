import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        price: number;
    }>;
    findAll(page: string, limit: string, sortBy: 'name' | 'price', order: 'asc' | 'desc'): Promise<{
        total: number;
        page: number;
        limit: number;
        products: {
            id: string;
            name: string;
            price: number;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        price: number;
    } | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        price: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        price: number;
    }>;
}
