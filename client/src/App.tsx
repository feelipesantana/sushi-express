
import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { router } from './routes'
import { ThemeProvider } from './components/ui/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const client = new QueryClient();

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | sushi.express" />

      <ThemeProvider defaultTheme='light' storageKey='ifood-theme'>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>

    </HelmetProvider>
  )
}

export default App
