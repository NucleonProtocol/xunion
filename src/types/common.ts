export interface ResponseType<T> {
  message: 'success';
  status: 200;
  data: T;
}

export interface ListType<T> {
  items: T[];
  total: number;
}
