export class Region {
  createdAt: string;
  id: string;
  parentId: string;
  title: string;
  updatedAt: string;
  subRegion: Region[] = [];
}
export class RegionOutput {
  rootTitle: string;
  rootId: string;
  parentTitle: string;
  parentId: string;
  regId: string;
  regTitle: string;
}


export class RegionDto {
  id:string;
  parentId: string;
  title: string;
}