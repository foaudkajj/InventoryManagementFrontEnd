import { FuseNavigation } from '@fuse/types';

export const adminNavigation: FuseNavigation[] = [
    {
        key: "mainpage",
        title: 'Ana Sayfa',
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        key: "usermgmt",
        title: 'Kullanıcı Yönetimi',
        translate: "NAV.USER_MANAGEMENT",
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: '/admin/usermanagement'
    },
    // {
    //     key: 'stockModule',
    //     title: 'Stok Modulü',
    //     // translate: 'NAV.APPLICATIONS',
    //     type: 'collapsable',
    //     children: [
    //         {
    //             key: 'product_manager',
    //             title: 'Ürün Ekleme/Silme',
    //             // translate: 'NAV.SAMPLE.TITLE',
    //             type: 'item',
    //             // icon: 'email',
    //             url: '/stock/productmanagement'
    //         }
    //     ]
    // },
];
