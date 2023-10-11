import { User } from '../../user/interface/user.interface';

export interface Order {
  id?: string;
  userId?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
