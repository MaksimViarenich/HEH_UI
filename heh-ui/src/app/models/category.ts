import { Tag } from './tag';

export interface Category {
  id: string;
  name: string;
  tags?: Array<Tag>;
}
