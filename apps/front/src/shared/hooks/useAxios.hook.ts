import { useEffect, useRef, useState } from 'react';
import axios, { Method } from 'axios';

// https://blog.openreplay.com/integrating-axios-with-react-hooks/
export const useAxios = (urlPath: string, method: Method, payload?: unknown) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const url = 'http://localhost:3945/api/mc/' + urlPath;

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};
