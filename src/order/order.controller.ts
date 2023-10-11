import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AddToOrderDto, GetOrderDto, OrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { BucketService } from '../bucket/bucket.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly bucketService: BucketService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrder(@Response() res: any, @Body() data: OrderDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.orderService.createNewOrder(data));
  }

  @Post('add')
  @UseGuards(AuthGuard)
  async add(@Response() res: any, @Body() data: AddToOrderDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.bucketService.addToOrder(data));
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getOrder(@Response() res: any, @Body() data: GetOrderDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.bucketService.getBucket(data.orderId));
  }

  @Get('history')
  @UseGuards(AuthGuard)
  async getOrderHistory(@Response() res: any, @Request() req: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.bucketService.getBucketHistory(req.user.id));
  }
}
