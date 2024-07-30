import {useEffect, useRef} from 'react';

type Callback = () => void;
type Delay = number | null;

export function useInterval(callback: Callback, delay: Delay) {
  const savedCallback = useRef<Callback>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
