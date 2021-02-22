export interface Tab {
  name: string;
  path: string;
  localizationKey: string;
}

export const HEADER_TABS: Tab[] = [
  {
    name: 'Discounts',
    path: 'discounts',
    localizationKey: 'header.discounts'
  },
  {
    name: 'Favorites',
    path: 'favorites',
    localizationKey: 'header.favorites'
  },
  {
    name: 'Notifications',
    path: 'notifications',
    localizationKey: 'header.notifications'
  },
  {
    name: 'Moderator',
    path: 'moderator',
    localizationKey: 'header.moderator'
  },
  {
    name: 'Admin',
    path: 'admin',
    localizationKey: 'header.admin'
  },
];

export const MODERATOR_TABS: Tab[] = [
  {
    name: 'Vendors',
    path: '/moderator/vendors',
    localizationKey: 'moderator.vendors'
  },
  {
    name: 'Categories & Tabs',
    path: '/moderator/categories_tags',
    localizationKey: 'moderator.categories'
  },
];

export const ADMIN_TABS: Tab[] = [
  {
    name: 'Users',
    path: '/admin/users',
    localizationKey: 'admin.users'
  },
  {
    name: 'Event History',
    path: '/admin/history',
    localizationKey: 'admin.history'
  },
  {
    name: 'Statistics',
    path: '/admin/statistics',
    localizationKey: 'admin.statistics'
  },
];
