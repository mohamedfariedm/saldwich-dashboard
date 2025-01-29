'use client'
import React from 'react'
import { QueryClient, QueryClientProvider,  DehydratedState } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  dehydratedState: DehydratedState,
  children: React.ReactNode
}

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate > */}
      {children}
      {/* </Hydrate> */}
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  );
}