export interface Discount {
  isFavorite?: boolean;
  vendorName: string;
  title: string;
  category: string;
  tags?: Array<string>;
  description: string;
  addressList: Array<string>;
  website?: string;
  phones: Array<string>;
  workingHours: string;
  validity: Date;
  instagram?: string;
  facebook?: string;
  vk?: string;
  feedback?: string;
  startDate?: Date;
  endDate?: Date;
}
