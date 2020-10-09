export interface LoadResult<T> {
    data: T[];
    totalCount: number;
    groupCount: number;
    summary: any[];
}