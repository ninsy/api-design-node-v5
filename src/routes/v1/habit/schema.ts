import { z } from 'zod';

const postSchema = z.object({
    name: z.string().min(1).max(100)
});

type PostSchema = z.infer<typeof postSchema>;

export {
    postSchema
};
export type {
    PostSchema
}
