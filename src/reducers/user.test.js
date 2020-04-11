import user from './user';
import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect.assertions(1);
    expect(user(undefined, {})).toStrictEqual({
      jwt: '',
      username: '',
      id: null,
      rolle: '',
    });
  });
  describe('action USER_LOGIN', () => {
    it('should set JWT', () => {
      expect.assertions(1);
      expect(user(undefined, { type: USER_LOGIN, payload: { jwt: '1234' } })).toStrictEqual({
        jwt: '1234',
        username: '',
        id: null,
        rolle: '',
      });
    });
    it('should spread user object', () => {
      expect.assertions(1);
      expect(
        user(undefined, {
          type: USER_LOGIN,
          payload: { user: { username: 'test', id: 1, rolle: 'admin' } },
        }),
      ).toStrictEqual({
        username: 'test',
        id: 1,
        rolle: 'admin',
        jwt: undefined,
      });
    });
    it('should omit __typename', () => {
      expect.assertions(1);
      const { __typename } = user(undefined, {
        type: USER_LOGIN,
        payload: { user: { __typename: 'User' } },
      });
      expect(__typename).toBeUndefined();
    });
  });
  describe('action USER_LOGOUT', () => {
    it('should reset state', () => {
      expect.assertions(1);
      expect(
        user(
          {
            jwt: '1234',
            username: 'test',
            id: 1,
            rolle: 'admin',
          },
          { type: USER_LOGOUT },
        ),
      ).toStrictEqual({
        jwt: '',
        username: '',
        id: null,
        rolle: '',
      });
    });
  });
});
