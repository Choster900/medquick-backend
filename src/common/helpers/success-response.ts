import { SuccessResponse } from "../interfaces";
/**
 *
 *
 * @export
 * @template T
 * @param {T} data
 * @param {string} [message='Operación realizada con éxito']
 * @param {number} [code=200]
 * @param {string} [path]
 * @return {*}  {SuccessResponse<T>}
 */
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
