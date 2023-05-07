import type { AspidaClient } from 'aspida';
import type { Methods as Methods0 } from './v1/black_jack_histories';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/v1/black_jack_histories';
  const GET = 'GET';
  const POST = 'POST';

  return {
    v1: {
      black_jack_histories: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option)
            .json()
            .then((r) => r.body),
        post: (option: {
          body: Methods0['post']['reqBody'];
          config?: T | undefined;
        }) =>
          fetch<Methods0['post']['resBody']>(
            prefix,
            PATH0,
            POST,
            option
          ).json(),
        $post: (option: {
          body: Methods0['post']['reqBody'];
          config?: T | undefined;
        }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
