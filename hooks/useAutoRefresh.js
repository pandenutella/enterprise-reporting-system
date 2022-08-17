import { useEffect, useRef } from "react";

const useAutoRefresh = (callback, seconds = 60) => {
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(callback, 1000 * seconds);

    return () => clearInterval(interval.current);
  }, []);
};

export default useAutoRefresh;
