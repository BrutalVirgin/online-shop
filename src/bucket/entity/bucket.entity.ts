import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../order/entity/order.entity';
import { Food } from '../../food/entity/food.entity';

@Entity()
export class Bucket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @OneToOne(() => Order, (order) => order.id)
  order: Order;

  @Column()
  foodId: string;

  @OneToOne(() => Food, (food) => food.id)
  @JoinColumn()
  food: Food;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
