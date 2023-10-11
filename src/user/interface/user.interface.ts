import { Order } from '../../order/interface/order.interface';

export interface User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  orders?: Order[];
  createdAt?: Date;
  updatedAt?: Date;
}
