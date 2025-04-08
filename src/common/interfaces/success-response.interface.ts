export interface SuccessResponse<T = any> {
    success: true;
    code: number; // HTTP status code
    message: string;
    data?: T;
    timestamp: string;
    path?: string; // puedes inyectarlo desde el request si deseas
}
