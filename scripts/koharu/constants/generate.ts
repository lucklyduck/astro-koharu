export type GenerateType = 'lqips' | 'similarities' | 'summaries';

// Load the repository .env file for the standalone CLI (Astro does this automatically,
// but `tsx scripts/koharu.tsx` does not).
try {
  process.loadEnvFile();
} catch {
  // .env is optional; callers may provide LLM_* variables directly.
}

export interface GenerateItem {
  id: GenerateType;
  label: string;
  description: string;
  duration: 'fast' | 'medium' | 'slow';
  script: string;
  requiresLlm?: boolean;
}

export const GENERATE_ITEMS: GenerateItem[] = [
  {
    id: 'lqips',
    label: 'LQIP 图片占位符',
    description: '快速 - 生成低质量图片占位符',
    duration: 'fast',
    script: 'src/scripts/generateLqips.ts', // TODO: Refactor to root scripts directory
  },
  {
    id: 'similarities',
    label: '相似度向量',
    description: '较慢 - 生成语义相似度向量 (首次需下载模型并缓存)',
    duration: 'medium',
    script: 'src/scripts/generateSimilarities.ts', // TODO: Refactor to root scripts directory
  },
  {
    id: 'summaries',
    label: 'AI 摘要',
    description: '依赖 LLM - 生成 AI 文章摘要',
    duration: 'slow',
    script: 'src/scripts/generateSummaries.ts', // TODO: Refactor to root scripts directory
    requiresLlm: true,
  },
];

export const DEFAULT_LLM_MODEL = process.env.LLM_MODEL || 'deepseek-v4-pro';
export const LLM_API_URL = process.env.LLM_API_BASE_URL || 'https://api.deepseek.com/v1/';
export const LLM_API_KEY = process.env.LLM_API_KEY || '';
