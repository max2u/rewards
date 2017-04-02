export class PageResponse<T> {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: Array<T>;
}