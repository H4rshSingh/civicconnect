import * as z from "zod";

export const IssueValidation = z.object({
    title: z.string().min(3, {message : 'Minimum 3 Characters'}).max(500).trim(),
    description: z.string().min(3, {message : 'Minimum 3 Characters'}).max(5000).trim(),
    location: z.string().min(3, {message : 'Minimum 3 Characters'}).max(500).trim(),
    image : z.string().optional(),
    reporterId: z.string(),
    department: z.string().optional(),
});

export const CommentValidation = z.object({
    comment: z.string().min(3, { message: "Minimum 3 characters." }).trim(),
  });
  