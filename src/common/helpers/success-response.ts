import { SuccessResponse } from "../interfaces";

export function buildSuccessResponse<T>(
    data: T,
    message = 'Operación realizada con éxito',
    code = 200,
    path?: string,
): SuccessResponse<T> {
    return {
        success: true,
        code,
        message,
        data,
        timestamp: new Date().toISOString(),
        ...(path && { path }),
    };
}
