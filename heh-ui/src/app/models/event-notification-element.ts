export interface EventNotificationElement {
  date: Date;
  type: string;
  title: string;
  message: string;
  discountId?: string;
  vendorId?: string;
}
