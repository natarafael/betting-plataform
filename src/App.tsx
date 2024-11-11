import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { router } from "./routes";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Suspense } from "react";
import "@/lib/i18n";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="betting-theme">
        <Suspense fallback="Loading...">
          <RouterProvider router={router} />
          <Toaster />
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
