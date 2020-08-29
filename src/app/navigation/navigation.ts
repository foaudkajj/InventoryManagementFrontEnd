import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        key: "mainpage",
        title: 'Ana Sayfa',
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        key: 'sellingModule',
        title: 'Satış Modulü',
        // translate: 'NAV.APPLICATIONS',
        type: 'collapsable',
        children: [
            {
                key: 'normal_sale',
                title: 'Normal Satış',
                // translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                // icon: 'email',
                url: '/selling/normalSale'
            },
            {
                key: 'recipt_sale',
                title: 'Faturalı Satış',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            }, {
                key: 'recipt_sale',
                title: 'İade',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            }, {
                key: 'recipt_sale',
                title: 'Değişim',
                type: 'item',
                // icon: 'flaticon-price-tag',
                url: '/dashboard'
                // translate: 'MENU.SELLING',
            },
        ]
    }
];
