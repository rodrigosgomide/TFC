export default function customError(status: number, message: string): object {
  return ({ status, message });
}
