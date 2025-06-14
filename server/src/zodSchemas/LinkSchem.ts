import { z } from 'zod';

export const linkSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    url: z.string().url({ message: 'Invalid URL' }),
    tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
});