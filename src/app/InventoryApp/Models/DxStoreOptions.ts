export interface DxStoreOptions {
    Key: string;
    loadUrl: string;
    insertUrl?: string;
    deleteUrl?: string;
    updateUrl?: string;
    onInserted?: (values: any, key: any) => void;
    onRemoved?: (key: any) => void;
    OnBeforeSend?: (operation: string, ajaxSettings: {
        cache?: boolean;
        contentType?: any;
        data?: any;
        dataType?: string;
        headers?: {
            [key: string]: any;
        };
        method?: string;
        password?: string;
        timeout?: number;
        url?: string;
        username?: string;
        xhrFields?: {};
    }) => void;
}