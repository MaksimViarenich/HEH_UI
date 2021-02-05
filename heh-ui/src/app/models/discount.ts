import { Phones } from './phones';
import { Address } from './address';

// export interface Discount {
//   isFavorite?: boolean;
//   vendorName: string;
//   title: string;
//   category: string;
//   tags?: Array<string>;
//   description: string;
//   addressList: Array<string>;
//   website?: string;
//   phones: Array<string>;
//   workingHours: string;
//   validity: Date;
//   instagram?: string;
//   facebook?: string;
//   vk?: string;
//   feedback?: string;
//   startDate?: Date;
//   endDate?: Date;
// }

export interface Discount {
  id: string;
  isFavorite?: boolean;
  vendorName: string;
  vendorId: string;
  title: string;
  categoryId: string;
  tagsIds?: Array<string>;
  condition: string;
  addressList: Array<Address>;
  phones: Array<Phones>;
  promoCode?: string;
  workingHours: string;
  feedback?: string;
  startDate?: Date;
  endDate?: Date;
}
