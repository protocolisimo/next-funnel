export const replacePlaceholders = (questionText?: string, answers?: Record<string, string>) =>
    questionText?.replace(/\{\{(.*?)\}\}/g, (_, questionId) => answers?.[questionId] || '...');
