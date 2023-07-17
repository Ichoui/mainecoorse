import { useEffect, useRef, useState } from 'react';
import axios, { Method } from 'axios';

// https://blog.openreplay.com/integrating-axios-with-react-hooks/
export const useAxios = (url: string, method: Method, payload?: unknown) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        // @ts-ignore
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};
