import {RouteInfo} from './sidebar.metadata';

export const ADMINS_ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Menus',
        icon: 'icon-Bird',
        class: 'nav-small-cap',
        extralink: true,
        submenu: []
    },
    {
        path: '/manage-category',
        title: 'Manage Category',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: 'product/create',
        title: 'Product Create',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    },

    {
        path: 'product/list',
        title: 'Product List',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/manage-order',
        title: 'Manage Order',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    }
];

export const CUSTOMER_ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Menus',
        icon: 'icon-Bird',
        class: 'nav-small-cap',
        extralink: true,
        submenu: []
    },
    {
        path: '/manage-order',
        title: 'Your Orders',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/home',
        title: 'Return to Product',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/cart',
        title: 'Cart',
        icon: 'icon-Files',
        class: '',
        extralink: false,
        submenu: []
    }
];
