export const quizKeys = {
  all: ['quizzes'] as const,
  lists: () => [...quizKeys.all, 'list'] as const,
  list: () => [...quizKeys.lists()] as const,
  details: () => [...quizKeys.all, 'detail'] as const,
  detail: (id: string) => [...quizKeys.details(), id] as const,
} as const;

export type QuizQueryKey =
  | typeof quizKeys.all
  | ReturnType<typeof quizKeys.list>
  | ReturnType<typeof quizKeys.detail>;
