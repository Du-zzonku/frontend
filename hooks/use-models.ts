import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchModelsPage } from '@/lib/api';

const PAGE_SIZE = 6;

export function useModels() {
  return useInfiniteQuery({
    queryKey: ['models'],
    queryFn: ({ pageParam }) =>
      fetchModelsPage({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.models),
  });
}
