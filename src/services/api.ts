import { default as aspida } from '@aspida/axios';
import { default as axios } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

type aspidaClientOptionsType = {
  withCredentials?: boolean;
};

const { VITE_BASE_URL } = import.meta.env;

const sessionUser = sessionStorage.getItem('user');
const parseUser = sessionUser ? JSON.parse(sessionUser) : undefined;
const accessToken = parseUser?.accessToken ?? '';
const uid = parseUser?.uid ?? '';
const client = parseUser?.client ?? '';

export const aspidaClient = (options?: aspidaClientOptionsType) =>
  aspida(
    applyCaseMiddleware(
      axios.create({
        baseURL: VITE_BASE_URL,
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
        ...options,
      }),
      { ignoreHeaders: true }
    )
  );
