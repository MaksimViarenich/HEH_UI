import { Address } from './address';
import { Phones } from './phones';
import {Discount} from './discount';

export interface Vendor {
    name: string;
    addressList: Array<Address>;
    website?: string;
    phones: Array<Phones>;
    workingHours: string;
    instagram?: string;
    facebook?: string;
    vk?: string;
    discounts?: Array<Discount>;
    isReceiveNotificationsAllowed: boolean;
    views?: number;
  }
