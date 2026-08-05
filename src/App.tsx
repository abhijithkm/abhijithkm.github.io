import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";

const AppsIndex = lazy(() => import("./pages/apps/AppsIndex"));
const AppDetail = lazy(() => import("./pages/apps/AppDetail"));
const AppPrivacy = lazy(() => import("./pages/apps/AppPrivacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<AppsIndex />} />
          <Route path="/apps/:slug" element={<AppDetail />} />
          <Route path="/apps/:slug/privacy" element={<AppPrivacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
