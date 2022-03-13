import international from './json/langs/international.json';
import english from './json/langs/en.json';
import oogieBoogie from './json/langs/ob.json';
import smilie from './json/langs/el.json';
import spanish from './json/langs/es.json';
import macedonian from './json/langs/mk.json';
import french from './json/langs/fr.json';
import polish from './json/langs/pl.json';
import tokipona from './json/langs/tp.json';
import german from './json/langs/de.json';

function getTextInAllLangs(text: string, text2?: string) {
  if (text2) {
    return [
      english[text][text2],
      smilie[text][text2],
      oogieBoogie[text][text2],
      spanish[text][text2],
      macedonian[text][text2],
      french[text][text2],
      polish[text][text2],
      tokipona[text][text2],
      german[text][text2]
    ];
  }

  if (typeof english[text][0] !== 'string') {
    const obj = {};
    for (const key in english[text]) {
      obj[key] = getTextInAllLangs(text, key);
    }
    return obj;
  } else {
    return [
      english[text],
      smilie[text],
      oogieBoogie[text],
      spanish[text],
      macedonian[text],
      french[text],
      polish[text],
      tokipona[text],
      german[text]
    ];
  }
}

export const texts = {
  ...international,
  error: getTextInAllLangs('error'),
  themes: getTextInAllLangs('themes'),
  kitty: getTextInAllLangs('kitty'),
  bad: getTextInAllLangs('bad'),
  options: getTextInAllLangs('options'),
  index: getTextInAllLangs('index'),
  navbar_items: getTextInAllLangs('navbar_items'),
  smilies: getTextInAllLangs('smilies'),
  'q+a': getTextInAllLangs('q+a')
};