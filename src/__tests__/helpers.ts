interface ICallMatch {
  url: string;
  options: object;
}

import { IActitoCredentials } from "../types";

export const credentials: IActitoCredentials = {
  user: "licence/WebService_user",
  password: "password",
  entity: "product",
  env: "test"
};

export const checkLastCall = (mocked: jest.Mock<any, any>) => (callMatch: ICallMatch) => {
  const calls = mocked.mock.calls;
  const [url, options] = calls[calls.length - 1];
  expect(url).toBe(callMatch.url);
  expect(options).toMatchObject(callMatch.options);
};
