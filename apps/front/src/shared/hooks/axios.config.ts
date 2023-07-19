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
  // Default value from API axios-hooks
  const { url, method, manual = false, autoCancel = true, useCache = false } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAxios({ headers, url: axiosUrl(url), method }, { manual, autoCancel, useCache });
};

export const fetchApi = (url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE') => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fetch(axiosUrl(url), { headers: new Headers({ maple: 'true', 'Content-Type': 'application/json' }), method })
    .then(e => {
      console.log(e);
    })
    .catch(error => console.log(error))
    .finally(() => true);
};
