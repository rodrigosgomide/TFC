export default function customError(status: number, message: string | undefined): object {
  return ({ status, message });
}

export interface ICustomError extends Error {
  status: number;
}
