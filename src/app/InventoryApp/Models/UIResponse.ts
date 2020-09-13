export interface UIResponse<T> {
    Data: any[];
    Entity: T;
    TotalCount: number;
    GroupCount: number;
    Summary: any[];
    Type: string;
    Message: string;
    IsError: boolean;
    Error: any;
    StatusCode: number;
}