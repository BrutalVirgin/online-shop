import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddFoodDto } from './dto/food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entity/food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}

  async addNewFood(data: AddFoodDto) {
    const ifFoodExist = await this.foodRepository.findOne({
      where: {
        name: data.name.trim(),
      },
    });

    if (ifFoodExist) {
      throw new HttpException(
        'This food is already in the store',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.foodRepository.save({
      name: data.name.trim(),
      quantity: data.quantity,
      price: data.price,
    });
  }

  async deleteFood(foodId: string) {
    const food = await this.foodRepository.findOne({
      where: { id: foodId },
    });

    if (!food) {
      throw new HttpException('This food not found', HttpStatus.NOT_FOUND);
    }

    return this.foodRepository.delete({
      id: foodId,
    });
  }
}
