export type VisualNovel = {
    id: number,
    title: string,
    original: string,
    released: Date,
    languages: string[],
    orig_lang: string[],
    platforms: string[],
    aliases: string,
    length: number,
    description: string,
    links: object,
    image: string,
    image_nsfw: boolean,
    image_flagging: object,
};

export type VNInUserList = {
    uid: number,
    vn: number,
    added: number,
    lastmod: number,
    voted: number,
    vote: number,
    notes: string,
    started: string,
    finished: string,
    labels: Label[],
}

type Label = {
    label: string,
    id: number
}