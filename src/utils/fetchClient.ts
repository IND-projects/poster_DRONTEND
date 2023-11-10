/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:5211';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  token = '',
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    };
  } else {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  } // token - полученный ранее jwt-токен

  // we wait for testing purpose to see loaders
  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string, token?: string) => request<T>(url, token),
  post: <T>(
    url: string, data: any, token?: string,
  ) => request<T>(url, token, 'POST', data),
  patch: <T>(
    url: string, data: any, token?: string,
  ) => request<T>(url, token, 'PATCH', data),
  delete: (url: string, token?: string) => request(url, token, 'DELETE'),
};
