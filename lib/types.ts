export type ModelMark =
  | "@chatgpt"
  | "@claude"
  | "@gemini"
  | "@copilot"
  | "@cursor"
  | "@midjourney"
  | "@perplexity"
  | "@llama"
  | "@deepseek"
  | "@grok";

export type AiListItem = {
  name: string;
  mark: ModelMark;
  sub: string;
};

export type AiCatalogItem = {
  name: string;
  company: string;
  mark: ModelMark;
  desc: string;
  bestAt: string;
  category: "Chat" | "Code" | "Image" | "Search" | "Foundation";
  modalities: string[];
  skill: string;
  pricing: string;
  featured?: boolean;
  lessons: number;
};

export type NewsArticleBody = {
  paragraphs: string[];
  subheadings?: { after: number; text: string }[];
  pullQuote?: string;
  pullQuoteAfter?: number;
};

export type NewsItem = {
  id?: string;
  tag?: string;
  company?: string;
  mark?: ModelMark | "§";
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  read?: string;
  featured?: boolean;
  sourceUrl?: string;
  topics?: string[];
  modelSlug?: string;
  body?: NewsArticleBody;
};

export type Lesson = {
  n: string;
  title: string;
  level: string;
  dur: string;
  desc: string;
  callout: { label: string; text: string };
  prompt: string;
  note: string;
};

export type ModelCatalogEntry = {
  name: string;
  mark: ModelMark;
  by: string;
  version: string;
  tagline: string;
  lessons: Lesson[];
  compare: { name: string }[];
};

export type EcoModel = {
  name: string;
  company: string;
  mark: ModelMark;
  role: string;
};

export type PairingFlowStep = {
  model: string;
  action: string;
};

export type PairingLessonItem = {
  n: string;
  title: string;
  level: string;
  dur: string;
  desc: string;
};

export type PairingContent = {
  from: string;
  to: string;
  why: string;
  bidirectional?: boolean;
  workflowTitle: string;
  summary: string;
  meta: string;
  flow: [PairingFlowStep, PairingFlowStep];
  lessons: PairingLessonItem[];
  handoffPrompt: string;
  lessonNote: string;
};

export type ResumeState = {
  slug: string;
  model: string;
  mark: ModelMark;
  lessonIdx: number;
  lessonNo: string;
  lessonTitle: string;
  level: string;
  dur: string;
};

export type ShowcaseComment = {
  who: { name: string; role: string; initials: string; color: string; slug: string };
  text: string;
  when: string;
};

export type ShowcaseProject = {
  id: string;
  dbId?: string;
  title: string;
  mono: string;
  grad: string;
  link: string;
  author: { name: string; role: string; initials: string; color: string; slug: string };
  mark: ModelMark;
  views: string;
  /** Raw view count for sorting (trending). */
  viewsCount?: number;
  likes: number;
  featured: boolean;
  hidden?: boolean;
  owner?: boolean;
  tags: string[];
  desc: string;
  comments: ShowcaseComment[];
  /** Comment count from DB (grid cards). */
  commentCount?: number;
  createdAt?: string;
  coverImg?: string;
};

export type ModelWithProgress = AiCatalogItem & {
  slug: string;
  done: number;
  total: number;
  pct: number;
  started: boolean;
  finished: boolean;
};
