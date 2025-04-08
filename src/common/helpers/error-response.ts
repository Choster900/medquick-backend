// src/common/helpers/error-response.ts

import { ErrorResponse } from '../interfaces';

export function buildErrorResponse(
    message: string,
    code: number = 400,
    errorDetails?: any,
    path?: string,
): ErrorResponse {
    return {
        success: false,
        code,
        message,
        errorDetails,
        timestamp: new Date().toISOString(),
        ...(path && { path }),
    };
}
