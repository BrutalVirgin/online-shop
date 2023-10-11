import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { AddFoodDto, DeleteFoodFto } from './dto/food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('add')
  async addFood(@Response() res: any, @Body() data: AddFoodDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.foodService.addNewFood(data));
  }

  @Delete('')
  async deleteFood(@Response() res: any, @Body() data: DeleteFoodFto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.foodService.deleteFood(data.foodId));
  }
}
