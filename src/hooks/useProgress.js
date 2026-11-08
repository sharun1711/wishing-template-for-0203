import { useEffect, useState } from "react";

const KEY = "birthday-surprise-progress-v1";

export function useProgress() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(KEY) === "unlocked");
  useEffect(() => {
    if (unlocked) localStorage.setItem(KEY, "unlocked");
  }, [unlocked]);
  const reset = () => {
    localStorage.removeItem(KEY);
    setUnlocked(false);
  };
  return { unlocked, setUnlocked, reset };
}
