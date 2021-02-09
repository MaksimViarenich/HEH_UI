import { Address } from './address';
import { Phones } from './phones';
import { Discount } from './discount';
import { Link } from './link';

export interface Vendor {
    name: string;
    email: string;
    id: string;
    addresses: Array<Address>;
    links?: Array<Link>;
    phones: Array<Phones>;
    workingHours?: string;
    discounts?: Array<Discount>;
    mailing: boolean;
    viewsAmount?: number;
  }
