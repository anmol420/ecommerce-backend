interface response {
  status: number;
  message: string;
  data?: any;
}

export class Response {
  static created(message: string, data?: any): response {
    return {
      status: 201,
      message,
      data,
    };
  }
  static ok(message: string, data?: any): response {
    return {
      status: 200,
      message,
      data,
    };
  }
}
