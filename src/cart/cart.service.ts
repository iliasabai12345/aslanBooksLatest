import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateCartDto} from "src/cart/dto/create-cart.dto";
import {Cart, CartDocument} from "src/cart/schemas/cart.schema";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {
    }

    async create(createCartDto: CreateCartDto): Promise<{ code: number, data: Cart, message: string }> {
        try {
            const current = await this.cartModel.findOne({sku: createCartDto.sku});
            if (current) {
                return {
                    code: 1,
                    data: null,
                    message: `Книга ${createCartDto.title} уже добавлено в корзину!`
                };
            }
            const newCart = new this.cartModel(createCartDto);
            const data = await newCart.save();
            return {
                code: 0,
                data,
                message: `Книга ${data.title} успешно добавлено в корзину!`
            };
        } catch (e) {
            return {
                code: 1,
                data: null,
                message: e
            };
        }
    }
}