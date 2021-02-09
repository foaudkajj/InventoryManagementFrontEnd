import { FuseNavigation } from '@fuse/types';

export const stockNavigation: FuseNavigation[] = [
    {
        key: "mainpage",
        title: 'Ana Sayfa',
        // icon: 'flaticon2-architecture-and-city',
        type: 'item',
        url: 'usertypeselect'
    },
    {
        key: 'stockModule',
        title: 'Stok Modulü',
        translate: 'NAV.STOCK_MODULE',
        type: 'collapsable',
        children: [
            {
                key: 'product_management',
                title: 'Ürün Ekleme/Silme',
                translate: 'NAV.PRODUCT_MANAGEMENT',
                type: 'item',
                // icon: 'email',
                url: '/stock/productmanagement'
            }
        ]
    },
    {
        key: 'masterdata',
        title: 'Ana Veri',
        translate: 'NAV.MASTERDATA',
        type: 'item',
        url: '/stock/masterdata'
    },
    {
        key: 'campaign',
        title: 'Kampanya',
        translate: 'NAV.CAMPAIGN',
        type: 'item',
        url: '/stock/campaign'
    }
];
