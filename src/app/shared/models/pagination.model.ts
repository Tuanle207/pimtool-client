
export interface PaginationModel<T> {
    pageSize?: number;
    pageIndex?: number;
    totalCount?: number;
    items: T[];
}

export interface PaginationFilter {
    pageSize?: number;
    pageIndex?: number;
}