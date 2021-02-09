import { Address } from './address';
import { Tag } from './tag';
import { Category } from './category';
import { Vendor } from './vendor-card';

export interface UserInfo {
  id: string;
  img?: string;
  role: string;
  name: string;
  email: string;
  address: Array<Address>;
  isActive: boolean;
  categoryNotifications?: Array<Category>;
  tagNotifications?: Array<Tag>;
  vendorNotifications?: Array<Vendor>;
  newVendorNotificationIsOn?: boolean;
  newDiscountNotificationIsOn?: boolean;
  hotDiscountsNotificationIsOn?: boolean;
  cityChangeNotificationIsOn?: boolean;
  favorites?: Array<any>;
}
