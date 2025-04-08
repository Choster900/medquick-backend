// src/common/interfaces/error-response.interface.ts

export interface ErrorResponse {
    success: false;
    code: number; // Código de estado HTTP
    message: string;
    errorDetails?: any; // Para detalles adicionales del error, si es necesario
    timestamp: string;
    path?: string; // Puedes inyectarlo desde el request si deseas
  }
