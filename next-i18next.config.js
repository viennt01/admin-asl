// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'EN',
    locales: ['EN', 'VN'],
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};
