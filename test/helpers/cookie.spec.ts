/*
 * @Description:
 * @Author: Kerminate
 * @Date: 2019-08-14 21:38:07
 */
import cookie from '../../src/helpers/cookie';

describe('helpers: cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=baz';
    expect(cookie.read('foo')).toBe('baz');
  });

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=baz';
    expect(cookie.read('bar')).toBeNull();
  });
});
