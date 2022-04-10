export type NavItems = {
  [key: string]: NavItem;
};

export type NavItem = {
  path: string;
  title: string;
};

export type MergedVNItem = {
  status: string;
  statusCode: number;
  vote: number;
  voted: string | number;
  id: number;
  title: string;
  original?: string;
  released?: Date;
  length?: number;
  description?: string;
  links?: Links;
  image?: string;
  image_nsfw: boolean;
  image_flagging?: ImageFlagging;
  notes: string;
};

export type VisualNovel = {
  id: number;
  title: string;
  original?: string;
  released?: Date;
  languages: string[];
  orig_lang: string[];
  platforms: string[];
  aliases?: string;
  length?: number;
  description?: string;
  links?: Links;
  image?: string;
  image_nsfw: boolean;
  image_flagging?: ImageFlagging;
};

export type VNInUserList = {
  uid: number;
  vn: number;
  added: number;
  lastmod: number;
  voted: number;
  vote: number;
  notes: string;
  started: string;
  finished: string;
  labels: Label[];
};

export type Label = {
  label: string;
  id: number;
};

export type Links = {
  encubed: string;
  renai: string;
  wikipedia: string;
  wikidata: string;
};

export type ImageFlagging = {
  votecount: number;
  sexual_avg: number;
  violence_avg: number;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SORT_STATE {
  asc = 'asc',
  desc = 'desc',
  init = 'init',
}
