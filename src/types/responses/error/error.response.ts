interface errorHandler {
  status: number;
  message: string;
  error?: string;
}

export class ErrorHandler {
  static badRequestHandler(
    message: string,
    error?: string,
  ): errorHandler {
    return {
      status: 400,
      message,
      error
    }
  }
  static notFoundHandler(
    message: string,
    error?: string,
  ): errorHandler {
    return {
      status: 404,
      message,
      error
    }
  }
  static conflictHandler(
    message: string,
    error?: string,
  ): errorHandler {
    return {
      status: 409,
      message,
      error
    }
  }
  static internalServerErrorHandler(
    message: string,
    error?: string,
  ): errorHandler {
    return {
      status: 500,
      message,
      error
    }
  }
}
