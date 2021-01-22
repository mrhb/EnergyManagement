export class Region {
  createdAt: string;
  id: string;
  parentId: string;
  title: string;
  updatedAt: string;
  subRegion: Region[] = [];
}
