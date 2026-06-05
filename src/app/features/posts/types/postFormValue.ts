import { IPost } from "../interfaces/IPost";

export type PostFormValue = Omit<IPost, 'tags'> & { tags: string };