import { Address } from './address';
import { Tag } from './tag';
import { Category } from './category';
import { Vendor } from './vendor';

export interface UserInfo {
  id: string;
  img?: string;
  role: string;
  name: string;
  email: string;
  address: Address;
  isActive: boolean;
  categoryNotifications?: Array<Category>;
  tagNotifications?: Array<Tag>;
  vendorNotifications?: Array<Vendor>;
  allNotificationsAreOn?: boolean;
  newVendorNotificationIsOn?: boolean;
  newDiscountNotificationIsOn?: boolean;
  hotDiscountsNotificationIsOn?: boolean;
  cityChangeNotificationIsOn?: boolean;
  favorites?: Array<any>;
}
