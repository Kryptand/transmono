import { Component, Host, h, State, Method, Prop, EventEmitter, Event } from '@stencil/core';
import { LanguageScopedTranslationEntry, TranslationEntries, TranslationEntry } from '../../utils/translation-entry';
import { DefaultTranslationLoader, TranslationLoader } from '../../utils/translation-loader';
import { DefaultTranspiler, Transpiler } from '../../utils/transpiler';
import { translationEntriesToArr } from '../../utils/utils';

const EN_LANG_IDENTIFIER = 'en-US';

@Component({
  tag: 'kryptand-translation-provider',
  styleUrl: 'kryptand-translation-provider.css',
  shadow: true,
})
export class TranslationProvider {
  @State() translationEntries: LanguageScopedTranslationEntry = new Map();
  @State() currentLang: string;
  /**
   * The default language
   * If no language is provided the browsers fallback is used.
   */
  @Prop() defaultLang: string;
  /**
   * The Translation Loader instance
   * The translation loader is used to load remote translation entries.
   * If no loader is provided the default one is used. The default translation loader caches your translation keys.
   * The default directory that is used for loading is assets/i18n/{LANGUAGE-IDENTIFIER}.
   */
  @Prop() loader: TranslationLoader = new DefaultTranslationLoader();

  /**
   * The transpiler instance
   * A transpiler is used to fill template strings in given translation entities with a value.
   * The default implementation replaces {{value}} with a string representation.
   */
  @Prop() transpiler: Transpiler = new DefaultTranspiler();

  /**
   * The event is fired when the language is changed.
   * The current language gets emitted.
   */
  @Event() languageChanged: EventEmitter<string>;

  /**
   * The event is triggered when entries are added
   * */
  @Event() translationEntriesUpdated: EventEmitter<LanguageScopedTranslationEntry>;
  async componentWillLoad(): Promise<void> {
    this.initializeDefaultLang();
    await this.loadTranslationEntriesForLang(this.currentLang);
  }

  /**
   * change the current language
   *
   * @param identifier language-identifier.
   */
  @Method()
  async changeLang(identifier: string) {
    this.currentLang = identifier;
    await this.loadTranslationEntriesForLang(this.currentLang);
  }
  /**
   * retrieve the translated value for the desired key
   *
   * @param key The identifier you specified in your translation file.
   * @param value If you use value placeholders you can set the desired value here e.g. {{value}}
   */
  @Method()
  async translateKey(key: string, value?: any) {
    return this.transpileValues(this.translationEntries, key, value);
  }

  /**
   * add translation entities
   *
   * @param translationEntries The entities you want to add.
   * @param lang The language the entries are valid for.
   *
   * this method can be used to provide translation entities at runtime
   * e.g. when loaded from a dynamic source
   */
  @Method()
  async addTranslationEntries(translationEntries: TranslationEntry[], lang = this.currentLang) {
    this.addEntriesForLang(lang, translationEntries);
    this.translationEntriesUpdated.emit(this.translationEntries);
  }

  /**
   * loads translation entries with the provided @prop translation loader
   *
   * @param lang The language of the desired entries.
   *
   * this method can be used to provide translation entities at runtime
   * e.g. when loaded from a dynamic source
   */
  @Method()
  async loadTranslationEntriesForLang(lang: string): Promise<void> {
    const result = await this.loader.fetchTranslations(lang);
    const entitiesAsArr = translationEntriesToArr(result);
    this.addEntriesForLang(lang, entitiesAsArr);
    this.translationEntriesUpdated.emit(this.translationEntries);
  }

  private addEntriesForLang(lang: string, translationEntries: TranslationEntry[]) {
    const currTranslations = this.translationEntries.get(lang);
    translationEntries.forEach(translationEntry => {
      currTranslations.set(translationEntry.key, translationEntry.value);
    });
    this.translationEntries.set(lang, currTranslations);
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
  private initializeDefaultLang() {
    if (this.defaultLang != null) {
      this.currentLang = this.defaultLang;
      return;
    }
    const lang = navigator.language;
    if (lang == null) {
      console.warn('It was not possible to get the default system language. Falling back to en-US. Provide the @prop defaultLang="de-DE" or similar');
    }
    this.defaultLang = lang || EN_LANG_IDENTIFIER;
    this.currentLang = lang || EN_LANG_IDENTIFIER;
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
