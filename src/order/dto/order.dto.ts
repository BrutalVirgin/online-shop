import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class AddToOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  foodId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class GetOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
