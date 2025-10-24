export interface ApiError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}
