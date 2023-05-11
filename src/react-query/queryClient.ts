import { MutationCache, QueryCache, QueryClient } from "react-query";

import { toast } from "react-toastify";

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
//   toast.closeAll();
  toast.error(title);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    // 개별 쿼리가 아닌 쿼리 캐시에 handler가 있기 때문에 모든 재시도가 실패한 뒤에 트리거된다.
    queryCache: new QueryCache({
        onError: queryErrorHandler
    }),
    mutationCache: new MutationCache({
      onError: queryErrorHandler
    }),
    defaultOptions: {
      queries: {
        staleTime: 600000,
        cacheTime: 900000,
        // refetchOnMount:false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
      }
    }
})
}

export const queryClient = generateQueryClient()