// tslint:disable-next-line:no-namespace
export namespace CrudModel {

  export class Pagination {
    totalElements = 0;
    page = 0;
    size = 10;
    sizeList: Array<number> = [5, 10, 15, 20, 50, 100];
  }

  export enum UpsertMode {
    CREATE = 'CREATE', UPDATE = 'UPDATE'
  }

}
