import { reduce, find } from 'lodash';

const availableLanguages = ['EN', 'FR'];
const isAvailableLanguage = langToTest =>
  find(availableLanguages, lang => lang === langToTest);
const defaultLanguage = 'FR';
const labels = {
  Greetings: {
    EN: 'Welcome',
    FR: 'Bienvenue',
  },
  Statistics: {
    EN: 'Statistics',
    FR: 'Statistiques',
  },
};
const getLabelsFromLang = lang =>
  reduce(
    labels,
    (reducer, value, key) => Object.assign({}, reducer, { [key]: value[lang] }),
    {},
  );

export const selectedLanguage = defaultLanguage; // TODO - Save users preferences in AsyncStorage
export const getLabelFromLang = (label, lang = selectedLanguage) => {
  if (isAvailableLanguage(lang)) {
    const labelFound = find(labels, (_, key) => key === label);
    if (labelFound !== undefined) {
      return labelFound[lang];
    }
  }
  return '';
};

export const FR = getLabelsFromLang('FR');
export const EN = getLabelsFromLang('EN');
export default getLabelFromLang;
