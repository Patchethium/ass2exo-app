export interface SytleInfo {
  font: string;
  size: string;
}

export interface SubtitleElement {
  layer: number;
  start: number;
  end: number;
  style: string;
  text: string;
}

export class Subtitle {
  styles: Map<string, SytleInfo> = new Map();
  elements: SubtitleElement[] = [];
}
