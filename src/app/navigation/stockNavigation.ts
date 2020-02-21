import { FuseNavigation } from '@fuse/types';

export const stockNavigation: FuseNavigation[] = [
    {
        id: "mainpage",
        title: 'Ana Sayfa' ,
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        id: 'stockModule',
        title: 'Stok Modulü',
        // translate: 'NAV.APPLICATIONS',
        type: 'collapsable',
        children: [
            {
                id: 'product_manager',
                title: 'Ürün Ekleme/Silme',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                // icon: 'email',
                url: '/dashboard'
            }
        ]
    },
    {
        id: 'masterdata',
        title: 'Ana Veri',
        // translate: 'NAV.APPLICATIONS',
        type: 'item',
        url: '#'
    }
];
