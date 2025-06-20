import { useLocation, matchPath } from "react-router-dom";

// Define the return type
type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path?: string, deep = true): ReturnType {
  const { pathname } = useLocation();

  // ✅ Ensure `path` is a string before using `matchPath`
  if (!path || typeof path !== "string") {
    return { active: false, isExternalLink: false };
  }

  const normalActive = !!matchPath({ path, end: true }, pathname);
  const deepActive = !!matchPath({ path, end: false }, pathname);

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.startsWith("http"), // Use `.startsWith()` safely
  };
}
