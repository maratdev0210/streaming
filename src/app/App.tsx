import { BrowserRouter } from "./routes/browser-router";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App() {
  const userId = localStorage.getItem("userId");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext value={userId}>
          <BrowserRouter />
        </AuthContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
