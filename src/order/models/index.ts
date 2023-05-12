import { CartItem } from '../../cart/models';

export type Order = {
  id?: string,
  userId: string;
  cartId: string;
  items: CartItem[]
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: string;
  total: number;
}
export interface OrderPayload  {
  address: {
    address: string,
    comment: string,
    firstName: string,
    lastName: string
  },
  items: CartItem[]
}