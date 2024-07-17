export interface DynamicFilter {
    fieldName: string;
    fieldValue: string;
    condition: 'equal' | 'contains' | 'starts with';
}

export interface DynamicTable {
    tableName: string;
    pageNumber: number;
    pageSize: number;
    sortField: string;
    sortDirection: string;
    globalSearch: string;
    dynamicFilter: DynamicFilter[];
}