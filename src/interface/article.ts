import { Tag } from "./tag";

export interface Article {
    _id: string,
    title: string,
    content: string | undefined,
    description: string,
    keyword: string[],
    tags: Tag[],
    cover_image: string,
    update_at: string,
    create_at: string,
}