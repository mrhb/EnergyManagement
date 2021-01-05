import {Sort} from './sort';

export class PageableResponse {
  content: any[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
