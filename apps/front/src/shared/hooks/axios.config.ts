import useAxios from 'axios-hooks';

export const headers = {
  maple: true,
};

export const axiosUrl = (url: string) => {
  const baseUrl = 'http://localhost:3945/api/mc/';
  return baseUrl + url;
};

export const configAxios = (props: {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  autoCancel?: boolean;
  manual?: boolean;
  useCache?: boolean;
}) => {
  const { url, method, manual = false, autoCancel = true, useCache = false } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAxios({ headers, url: axiosUrl(url), method }, { manual, autoCancel, useCache });
};
