import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";

// 1. Taxonomic Data (JSON/YAML)
const skills = defineCollection({
  loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/skills" }),
  schema: z.object({
    name: z.string(),
    category: z.enum([
      "Languages",
      "Mathematics & Theory",
      "Control & Systems Engineering",
      "Backend & Architecture",
      "Frontend",
      "Tools & OS",
    ]),
    description: z.string().max(200, "Keep skill descriptions concise (1-2 sentences)."),
    // Optional metadata for visual representation (e.g., icon names)
    iconString: z.string().optional(),
  }),
});

// 2. Content Collections (Markdown)
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(150, "Abstract must fit within a standard card UI."),
      startDate: z.date(),
      endDate: z.date().optional(),
      context: z.enum(["Academic", "Independent", "Professional"]),
      // Astro's reference API strictly binds this array to valid IDs in the skills collection
      skills: z.array(reference("skills")),
      tags: z.array(z.string()).optional(),
      links: z
        .object({
          repository: z.string().url().optional(),
          liveDemo: z.string().url().optional(),
          documentation: z.string().url().optional(),
        })
        .optional(),
      thumbnail: image().optional(),
      featured: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    organization: z.string(),
    role: z.string(),
    startDate: z.date(),
    // Nullable/Optional end date implies "Present"
    endDate: z.date().optional(),
    skills: z.array(reference("skills")).default([]),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/education" }),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    gpa: z.string().optional(),
    coreCoursework: z.array(z.string()),
    milestones: z.array(z.string()).optional(),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/thoughts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.date(),
      // SEO & OpenGraph Overrides
      seoTitle: z.string().optional(),
      seoDescription: z.string().max(160).optional(),
      thumbnail: image().optional(),
      tags: z.array(z.string()),
      // Note: readTime is deliberately omitted from the schema.
    }),
});

export const collections = {
  skills,
  projects,
  experience,
  education,
  thoughts,
};
