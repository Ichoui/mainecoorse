import { useEffect, useRef, useState } from 'react';
import axios, { Method } from 'axios';

// TODO - Supprimer plus tard !
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
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Access-Control-Allow-Origin': '*',
            'maple': true,
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

export const useAxiosPost = () => {
  const [input, setInput] = useState({
    data: null,
    url: null,
    callback: null,
  });

  useEffect(() => {
    const postData = () => {
      axios
        .post('http://localhost:3945/api/mc/' + input.url, input.data)
        .then(res => {
          // @ts-ignore
          return input.callback(res.data);
        })
        .catch(err => console.error(err));
    };

    if (input.data && input.url && input.callback) {
      postData();
    } else {
      console.log('Invalid arguments provided to post method');
    }
  }, [input]);
  const post = (url: any, data: any, callback?: any) => {
    setInput({ url, data, callback });
  };
  return post;
};
