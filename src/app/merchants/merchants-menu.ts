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
    title: 'Deals',
    icon: 'ion-ios-briefcase-outline',
      
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
  },  
  {
    title: 'Add Money',
    icon :'nb-plus-circled'
  } 
];
