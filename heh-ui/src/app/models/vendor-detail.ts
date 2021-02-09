import { Address } from './address';
import { Phones } from './phones';
import {Discount} from './discount';
import {Link} from './link';

export interface VendorDetail {
    name: string;
    email: string;
    id: string;
    addresses: Array<Address>;
    links?: Array<Link>;
    phones: Array<Phones>;
    workingHours?: string;
    instagram?: string;
    facebook?: string;
    vk?: string;
    discounts?: Array<Discount>;
    mailing: boolean;
    viewsAmount?: number;
  }
