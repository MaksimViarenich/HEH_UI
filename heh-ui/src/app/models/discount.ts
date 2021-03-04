import { Phones } from './phones';
import { Address } from './address';

export interface Discount {
  id: string;
  isFavorite?: boolean;
  vendorName: string;
  vendorId: string;
  title: string;
  categoryId: string;
  tagsIds?: Array<string>;
  conditions: string;
  addressList: Array<Address>;
  phones: Array<Phones>;
  promoCode?: string;
  workingHours: string;
  feedback?: string;
  startDate?: Date;
  endDate?: Date;
}
