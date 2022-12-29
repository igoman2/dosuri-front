import { QueryClient } from "react-query";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  alert(title);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
        onError: queryErrorHandler,
        staleTime: 60000,
        cacheTime: 90000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
