import { FuseNavigation } from '@fuse/types';

export const stockNavigation: FuseNavigation[] = [
    {
        key: "mainpage",
        title: 'Ana Sayfa' ,
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        key: 'stockModule',
        title: 'Stok Modulü',
        // translate: 'NAV.APPLICATIONS',
        type: 'collapsable',
        children: [
            {
                key: 'product_manager',
                title: 'Ürün Ekleme/Silme',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                // icon: 'email',
                url: '/stock/productmanager'
            }
        ]
    },
    {
        key: 'masterdata',
        title: 'Ana Veri',
        // translate: 'NAV.APPLICATIONS',
        type: 'item',
        url: '/stock/masterdata'
    }
];
