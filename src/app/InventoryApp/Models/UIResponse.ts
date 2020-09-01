export interface UIResponse<T> {
    data: any[];
    Entity: T;
    totalCount: number;
    groupCount: number;
    summary: any[];
    type: string;
    message: string;
    isError: boolean;
    error: any;
    statusCode: number;
}