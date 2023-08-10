import useAxios from 'axios-hooks';

export const headers = {
  maple: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // 'Access-Control-Allow-Origin': '*',
};

export const axiosUrl = (url: string) => {
  // https://vitejs.dev/guide/env-and-mode.html
  let baseUrl;
  const env: ImportMetaEnv = import.meta.env;
  const prefix = env.VITE_PREFIX;
  if (env.VITE_DEBUG_MODE === 'true' && env.DEV) {
    baseUrl = env.VITE_HOST_EMULATOR;
  } else if (env.VITE_DEBUG_PROD_MODE === 'true' && env.DEV) {
    baseUrl = env.VITE_HOST_PROD;
  } else {
    baseUrl = env.VITE_HOST;
  }
  return baseUrl + prefix + url;
};

export const configAxios = (props: {
  url?: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  autoCancel?: boolean;
  manual?: boolean;
  useCache?: boolean;
  params?: unknown;
}) => {
  const { url, method, manual = false, autoCancel = true, useCache = false, params } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAxios({ headers, url: axiosUrl(url!), method, params }, { manual, autoCancel, useCache });
};
