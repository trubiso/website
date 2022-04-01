import international from './json/langs/international.json';
import en from './json/langs/en.json';
import ob from './json/langs/ob.json';
import el from './json/langs/el.json';
import es from './json/langs/es.json';
import mk from './json/langs/mk.json';
import fr from './json/langs/fr.json';
import pl from './json/langs/pl.json';
import tp from './json/langs/tp.json';
import de from './json/langs/de.json';
import ja from './json/langs/ja.json';

function get(text: string, text2?: string) {
  if (text2) {
    return [
      en[text][text2],
      el[text][text2],
      ob[text][text2],
      es[text][text2],
      mk[text][text2],
      fr[text][text2],
      pl[text][text2],
      tp[text][text2],
      de[text][text2],
      ja[text][text2]
    ];
  }

  if (typeof en[text][0] !== 'string') {
    const obj = {};
    for (const key in en[text]) {
      obj[key] = get(text, key);
    }
    return obj;
  } else {
    return [
      en[text],
      el[text],
      ob[text],
      es[text],
      mk[text],
      fr[text],
      pl[text],
      tp[text],
      de[text],
      ja[text]
    ];
  }
}

export const texts = {
  ...international,
  error: get('error'),
  themes: get('themes'),
  kitty: get('kitty'),
  bad: get('bad'),
  options: get('options'),
  index: get('index'),
  navbar_items: get('navbar_items'),
  smilies: get('smilies'),
  'q+a': get('q+a'),
  about: get('about')
};