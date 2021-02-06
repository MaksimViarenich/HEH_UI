import {Discount} from './discount';

export interface Vendor {
    name: string;
    addressList: Array<string>;
    website?: string;
    phones: Array<string>;
    workingHours: string;
    instagram?: string;
    facebook?: string;
    vk?: string;
    discounts?: Array<Discount>;
    isReceiveNotificationsAllowed: boolean;
    views?: number;
  }
