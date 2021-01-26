export interface Tabs {
  name: string;
  path: string;
}

export const HEADER_TABS: Tabs[] = [
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
    path: 'moderator'
  },
  {
    name: 'Admin',
    path: 'admin'
  },
];

export const MODERATOR_TABS: Tabs[] = [
  {
    name: 'Vendors',
    path: '/moderator/vendors'
  },
  {
    name: 'Categories & Tabs',
    path: '/moderator/categories_tags'
  },
];

export const ADMIN_TABS: Tabs[] = [
  {
    name: 'Users',
    path: '/admin/users'
  },
  {
    name: 'Event History',
    path: '/admin/history'
  },
  {
    name: 'Statistics',
    path: '/admin/statistics'
  },
];
