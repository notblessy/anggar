export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedResponse<T> {
  records: T[];
  page_summary: {
    has_next: boolean;
    page: number;
    size: number;
    total: number;
  };
}