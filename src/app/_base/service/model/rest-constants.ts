import {HttpHeaders} from '@angular/common/http';

// export const GATEWAY_URL = 'http://194.5.179.45:3000';
export const GATEWAY_URL = 'http://localhost:3000';
export const TOKEN_PREFIX = 'Bearer ';
export const TOKEN_HEADER_NAME = 'Authorization';
export const TOKEN_CACHE_KEY = 'TOKEN';
export const DEFAULT_HTTP_HEADERS: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
