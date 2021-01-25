export interface HeaderTab {
  name: string;
  path: string;
}

export const HEADER_TABS: HeaderTab[] = [
  {
    name: 'Discounts',
    path: 'discounts'
  },
  {
    name: 'Favorites',
    path: 'favorites'
  },
  {
    name: 'Moderator',
    path: 'moderator/vendors'
  },
  {
    name: 'Admin',
    path: 'admin/users'
  },
];