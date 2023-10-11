import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createNewOrder(data: OrderDto) {
    return this.orderRepository.save({
      userId: data.userId,
    });
  }

  async findAllOrdersByUSerId(userId: string) {
    const orders = await this.orderRepository.find({
      where: {
        userId,
      },
      select: { id: true },
    });

    const orderIds = orders.map((order) => order.id);
    return orderIds;
  }
}
