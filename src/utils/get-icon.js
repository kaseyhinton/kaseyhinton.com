// @flow strict
import { ICONS } from '../constants';

const getIcon = (name: string) => {
  let icon;

  switch (name) {
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'email':
      icon = ICONS.EMAIL;
      break;
    case 'rss':
      icon = ICONS.RSS;
      break;
    case 'instagram':
      icon = ICONS.INSTAGRAM;
      break;
    case 'facebook':
      icon = ICONS.FACEBOOK;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
