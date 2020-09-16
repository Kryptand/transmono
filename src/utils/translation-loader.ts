import { TranslationEntries } from './translation-entry';
import { TranslationLoaderOptions } from './translation-loader-options';
import { mapFromObj } from './utils';

export const DEFAULT_TRANSLATION_LOADER_OPTIONS: TranslationLoaderOptions = {
  path: `assets/i18n/`,
};

export interface TranslationLoader {
  fetchTranslations(loacle: string): Promise<TranslationEntries>;
}

export class DefaultTranslationLoader implements TranslationLoader {
  private options: TranslationLoaderOptions = DEFAULT_TRANSLATION_LOADER_OPTIONS;

  public configure(options: TranslationLoaderOptions) {
    this.options = options;
  }
  private translationCache: Map<string, any> = new Map();
  private buildReqUrlFromOptions = (locale: string) => {
    const { path } = this.options;
    return `${path}${locale}.json`;
  };
  async fetchTranslations(locale: string): Promise<TranslationEntries> {
    if (locale == '' || locale == null) {
      throw new Error(`Can't fetch translation entries. There was no locale provided.`);
    }
    const reqUrl = this.buildReqUrlFromOptions(locale);
    const translation = this.translationCache.get(reqUrl);
    if (translation) {
      return translation;
    }
    const response = await fetch(reqUrl);
    if (!response.ok) {
      throw new Error('There was an error fetching translation files.');
    }
    const res = response.json();
    const mappedValue = mapFromObj(res);
    this.translationCache.set(reqUrl, mappedValue);
    return mappedValue;
  }
}
