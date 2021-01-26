export interface Tab {
  name: string;
  path: string;
  key: string;
}

export const HEADER_TABS: Tab[] = [
  {
    name: 'Discounts',
    path: 'discounts',
    key: 'header.discounts'
  },
  {
    name: 'Favorites',
    path: 'favorites',
    key: 'header.favorites'
  },
  {
    name: 'Moderator',
    path: 'moderator',
    key: 'header.moderator'
  },
  {
    name: 'Admin',
    path: 'admin',
    key: 'header.admin'
  },
];

export const MODERATOR_TABS: Tab[] = [
  {
    name: 'Vendors',
    path: '/moderator/vendors',
    key: 'moderator.vendors'
  },
  {
    name: 'Categories & Tabs',
    path: '/moderator/categories_tags',
    key: 'moderator.categories'
  },
];

export const ADMIN_TABS: Tab[] = [
  {
    name: 'Users',
    path: '/admin/users',
    key: 'admin.users'
  },
  {
    name: 'Event History',
    path: '/admin/history',
    key: 'admin.history'
  },
  {
    name: 'Statistics',
    path: '/admin/statistics',
    key: 'admin.statistics'
  },
];
