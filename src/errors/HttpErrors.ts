export class HttpError extends Error {
  public status: number;
  constructor(message = "Erro interno", status = 500) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Não autorizado") {
    super(message, 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Não encontrado") {
    super(message, 404);
  }
}
