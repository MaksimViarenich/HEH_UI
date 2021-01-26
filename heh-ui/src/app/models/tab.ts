export interface Tab {
  name: string;
  path: string;
}

export const HEADER_TABS: Tab[] = [
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

export const MODERATOR_TABS: Tab[] = [
  {
    name: 'Vendors',
    path: '/moderator/vendors'
  },
  {
    name: 'Categories & Tabs',
    path: '/moderator/categories_tags'
  },
];

export const ADMIN_TABS: Tab[] = [
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
