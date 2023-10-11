import { IsInt, Min, IsNotEmpty, IsString } from 'class-validator';

export class AddFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt({})
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsInt({})
  @Min(1)
  price;
}

export class DeleteFoodFto {
  @IsString()
  @IsNotEmpty()
  foodId: string;
}
