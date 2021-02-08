import { Discount } from './discount';
import { Links } from './links';

export interface Favorites {
  discount: Discount;
  links?: Array<Links>;
}
