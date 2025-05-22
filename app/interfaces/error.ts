export interface signInError {
    message: string,
    error_code: number
}

export interface GenericError {
    message?: string,
    error_code?: number
    detail?: string;
    error: string
    errors: string[]
}

