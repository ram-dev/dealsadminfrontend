import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/admin-merchants/dashboard',
    home: true,
  },  
  {
    title: 'Vendors',
    icon: 'nb-person',   
    link: '/admin-merchants/vendor/list',
    
  },
  {
    title: 'Active Deals',
    icon: 'ion-ios-briefcase-outline',
    link: '/admin-merchants/deals/list',      
  }, 
  {
    title: 'Request Deals',
    icon: 'nb-compose',    
    link: '/admin-merchants/deals/golive',  
  },  
  {
    title: 'Settings',
    icon: 'nb-gear',
    children: [
      {
        title: 'Profile',
        link: '/admin-merchants/profile/edit/',
      },
      {
        title: 'Change Password',
        link: '/admin-merchants/profile/changepwd/',
      }
    ],
  }
  
];
