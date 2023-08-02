import useAxios from 'axios-hooks';

export const headers = {
  maple: true,
};

export const axiosUrl = (url: string) => {
  // console.log(import.meta.env);
  // https://vitejs.dev/guide/env-and-mode.html
  // const baseUrl = 'http://localhost:3945/mc/';
  const baseUrl = 'https://us-central1-mainecoorse.cloudfunctions.net/mc/';
  // const baseUrl = 'http://localhost:5000/mainecoorse/us-central1/mc/';
  return baseUrl + url;
};

export const configAxios = (props: {
  url?: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  autoCancel?: boolean;
  manual?: boolean;
  useCache?: boolean;
  params?: unknown
}) => {
  const { url, method, manual = false, autoCancel = true, useCache = false, params } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAxios({ headers, url: axiosUrl(url!), method, params }, { manual, autoCancel, useCache });
};
