import { IPost } from "../interfaces/IPost";

export type postFormValue = Omit<IPost, 'tags'> & { tags: string };