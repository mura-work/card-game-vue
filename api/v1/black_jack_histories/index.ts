import { BlackJackHistoryType } from '../../../src/types/index';

export type Methods = {
  get: {
    resBody: BlackJackHistoryType[];
  };

  post: {
    reqBody: BlackJackHistoryType;
    resBody: BlackJackHistoryType;
  };
};
