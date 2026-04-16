export type PostStatus = "draft" | "published";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  tags: string[];
  status: PostStatus;
}

export type UpdatePostPayload = Partial<CreatePostPayload>;
