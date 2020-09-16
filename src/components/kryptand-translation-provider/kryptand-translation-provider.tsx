import { Component, Host, h, State, Method, Prop } from '@stencil/core';
import { LanguageScopedTranslationEntry, TranslationEntries, TranslationEntry } from '../../utils/translation-entry';
import { DefaultTranslationLoader, TranslationLoader } from '../../utils/translation-loader';
import { DefaultTranspiler, Transpiler } from '../../utils/transpiler';

const EN_LANG_IDENTIFIER = 'en-US';
const translationEntriesToArr = (entries: TranslationEntries): TranslationEntry[] => {
  let entitiesAsArr = [];
  entries.forEach((key, val) => {
    entitiesAsArr = [...entitiesAsArr, { key: key, value: val }];
  });
  return entitiesAsArr;
};

@Component({
  tag: 'kryptand-translation-provider',
  styleUrl: 'kryptand-translation-provider.css',
  shadow: true,
})
export class TranslationProvider {
  @State() translationEntries: LanguageScopedTranslationEntry = new Map();
  @State() currentLang: string;
  @Prop() defaultLang: string;
  @Prop() loader: TranslationLoader = new DefaultTranslationLoader();
  @Prop() transpiler: Transpiler = new DefaultTranspiler();

  async componentWillLoad(): Promise<void> {
    this.initializeDefaultLang();
    await this.loadTranslationEntriesForLang(this.currentLang);
  }

  private initializeDefaultLang() {
    if (!this.defaultLang) {
      const lang = navigator.language;
      if (!lang) {
        console.warn('It was not possible to get the default system language. Falling back to en-US. Provide the @prop defaultLang="de-DE" or similar');
      }
      this.defaultLang = lang || EN_LANG_IDENTIFIER;
      this.currentLang = lang || EN_LANG_IDENTIFIER;
      return;
    }
    this.currentLang = this.defaultLang;
  }

  @Method()
  async changeLang(identifier: string) {
    this.currentLang = identifier;
    await this.loadTranslationEntriesForLang(this.currentLang);
  }
  @Method()
  async translate(key: string, value?: any) {
    this.transpileValues(this.translationEntries, key, value);
  }
  @Method()
  addTranslationEntries(translationEntries: TranslationEntry[], lang = this.currentLang) {
    this.addEntriesForLang(lang, translationEntries);
  }

  private addEntriesForLang(lang: string, translationEntries: TranslationEntry[]) {
    const currTranslations = this.translationEntries.get(lang);
    translationEntries.forEach(translationEntry => {
      currTranslations.set(translationEntry.key, translationEntry.value);
    });
    this.translationEntries.set(lang, currTranslations);
  }

  @Method()
  async loadTranslationEntriesForLang(lang: string) {
    const result = await this.loader.fetchTranslations(lang);
    const entitiesAsArr = translationEntriesToArr(result);
    this.addEntriesForLang(lang, entitiesAsArr);
  }

  private transpileValues(translationValues: Map<string, TranslationEntries>, key: string, value: any) {
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
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
