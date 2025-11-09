import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export const useHydration = () => {
  const [hydrated, setHydarted] = useState(false);
  const hasHydrated = useStore((state) => state._hasHydrated);
  useEffect(() => {
    if (hasHydrated) {
      setHydarted(true);
    }
  }, [hasHydrated]);
  return hydrated;
};
