'use client'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

 
const QueryProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider