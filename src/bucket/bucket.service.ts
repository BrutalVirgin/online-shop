import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Bucket } from './entity/bucket.entity';
import { AddToOrderDto } from '../order/dto/order.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
    private readonly orderService: OrderService,
  ) {}

  async addToOrder(data: AddToOrderDto) {
    return this.bucketRepository.save(data);
  }

  async getBucket(orderId: string) {
    const orders = await this.bucketRepository.find({
      where: {
        orderId,
      },
      relations: ['food'],
    });

    const food = orders.map((order) => ({
      name: order.food.name,
      quantity: order.food.quantity,
      price: order.food.price,
    }));

    const finalPrice = food.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    return {
      orderId,
      food,
      finalPrice,
    };
  }

  async getBucketHistory(userId: string) {
    const orderIds = await this.orderService.findAllOrdersByUSerId(userId);

    return this.bucketRepository.find({
      where: {
        orderId: In(orderIds),
      },
      relations: ['food'],
    });
  }
}
