export interface OperationResponse {
    messages: string[];
    statusCode: string;
    isSuccess: boolean;
    payload: any;
    recordCount: number;
}
