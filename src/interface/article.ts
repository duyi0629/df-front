import { Tag } from "./tag";

export interface Article {
    _id: String,
    title: String,
    content: String,
    description: string,
    keyword: string[],
    tags: Tag[],
    update_at: string,
    create_at: string,
}