import { BrowserRouter } from "./routes/browser-router";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
