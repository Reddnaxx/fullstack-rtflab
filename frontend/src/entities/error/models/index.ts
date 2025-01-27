import type { AxiosError } from 'axios';

export interface APIErrorResponse {
  message?: string;
}

export class APIError {
  readonly message?: string;
  readonly status: number;

  constructor(status: number, message?: string) {
    this.message = message;
    this.status = status;
  }

  static fromAxiosError(error: AxiosError<APIErrorResponse>) {
    return new APIError(
      error.response?.status || 500,
      error.response?.data?.message
    );
  }

  getCodeDescription() {
    switch (this.status) {
      case 400:
        return 'Произошла ошибка на стороне клиента';
      case 401:
        return 'Ошибка авторизации';
      case 403:
        return 'Доступ запрещен';
      case 404:
        return 'Ресурс не найден';
      case 500:
        return 'Произошла ошибка на стороне сервера';
      default:
        return 'Неизвестная ошибка';
    }
  }

  translateMessage(message: string) {
    switch (message) {
      case 'Invalid credentials':
        return 'Неверные учетные данные';
      case 'User with provided email already exists':
        return 'Пользователь с указанным email уже существует';
      default:
        return message;
    }
  }

  getMessageOrCodeDescription() {
    return this.message
      ? this.translateMessage(this.message)
      : this.getCodeDescription();
  }
}
