import { LanguageScopedTranslationEntry, TranslationEntries, TranslationEntry } from './translation-entry';
import { DefaultTranslationLoader, TranslationLoader } from './translation-loader';
import { DefaultTranspiler, Transpiler } from './transpiler';

export class Translator {
  constructor(
    defaultLanguage?: string,
    private loader?: TranslationLoader,
    private transpiler?: Transpiler
  ) {
    this.loader = loader || new DefaultTranslationLoader();
    this.transpiler = transpiler || new DefaultTranspiler();
    const currentLang = defaultLanguage || (navigator && navigator.language);
    this.defaultLang = currentLang;
    this.currentLang = currentLang;
  }

  defaultLang:string;
  currentLang:string;

  changeLanguage(lang: string) {
    this.currentLang = lang;

  }

  translationEntries: LanguageScopedTranslationEntry = new Map();

  readonly translate = (key: string, value?: any) =>
    this.transpileValues(this.translationEntries, key, value);

  private transpileValues(
    translationValues: Map<string, TranslationEntries>,
    key: string,
    value: any
  ) {
    const currTranslationValues = translationValues.get(this.currentLang);
    if (currTranslationValues == null) {
      return key;
    }
    const translatedString = currTranslationValues.get(key);
    if (translatedString == null) {
      return key;
    }
    return this.transpiler.transform(translatedString, value);
  }

  addTranslationEntries(
    translationEntries: TranslationEntry[],
    lang = this.currentLang
  ) {
    const currTranslations = this.translationEntries.get(lang);
    translationEntries.forEach((translationEntry) => {
      currTranslations.set(translationEntry.key, translationEntry.value);
    });
    this.translationEntries.set(lang, currTranslations);
  }
  async initializeTranslations() {
    const result = await this.loader.fetchTranslations(this.currentLang);
    const translations = new Map();
    translations.set(this.currentLang, result);
    this.translationEntries = translations;
  }
}
