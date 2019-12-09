// @flow strict
import getIcon from './get-icon';
import { ICONS } from '../constants';

test('getIcon', () => {
  expect(getIcon('github')).toBe(ICONS.GITHUB);
  expect(getIcon('email')).toEqual(ICONS.EMAIL);
  expect(getIcon('rss')).toEqual(ICONS.RSS);
  expect(getIcon('instagram')).toEqual(ICONS.INSTAGRAM);
  expect(getIcon('facebook')).toEqual(ICONS.FACEBOOK);
});
