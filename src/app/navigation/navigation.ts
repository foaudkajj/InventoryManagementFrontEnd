import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: "mainpage",
        title: 'Ana Sayfa',
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        id: 'sellingModule',
        title: 'Satış Modulü',
        // translate: 'NAV.APPLICATIONS',
        type: 'collapsable',
        children: [
            {
                id: 'normal_sale',
                title: 'Normal Satış',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                // icon: 'email',
                url: '/dashboard'
            },
            {
                id: 'recipt_sale',
                title: 'Faturalı Satış',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            }, {
                id: 'recipt_sale',
                title: 'İade',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            }, {
                id: 'recipt_sale',
                title: 'Değişim',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            },
        ]
    }
];
