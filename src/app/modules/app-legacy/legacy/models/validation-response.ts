export class ValidationResponse {
    message: string;
    errors: Array<{ field: string, message: string }>;
}
