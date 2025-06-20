import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/CustomComponents/ErrorBoundary.js";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop.js";
import App from "./App.js";
import { AuthProvider } from "./auth/JwtContext.js";
import { SettingsProvider } from "./components/settings/SettingsContext.js";

createRoot(document.getElementById("root")!).render(
  // <ErrorBoundary>
  <AuthProvider>
    <SettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </SettingsProvider>
  </AuthProvider>
  // </ErrorBoundary>
);
