import { Component, Host, h, State, Prop, Listen } from '@stencil/core';
import { getElemWhenDefined } from '../../utils/utils';
import { NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE, TRANSLATION_PROVIDER_TAG } from './constants';

@Component({
  tag: 'kryptand-translate',
  styleUrl: 'kryptand-translate.css',
  shadow: true,
})
export class Translate {
  /**
   * The key you set in your translation file.
   * {
   *   "hello":"Hallo Welt"
   * }
   */
  @Prop() name: string;
  /**
   * The value you want to insert into your string.
   * {
   *   "hello":"Hallo {{value}}"
   * }
   */
  @Prop() value: any;
  @State() currValue: string;
  private translatorInstance: HTMLKryptandTranslationProviderElement;
  async componentWillLoad() {
    try {
      const translatorInstance = await getElemWhenDefined<HTMLKryptandTranslationProviderElement>(TRANSLATION_PROVIDER_TAG);
      console.debug(this.translatorInstance);
      this.translatorInstance = translatorInstance;
      this.currValue = await translatorInstance.translateKey(this.name, this.value);
    } catch (err) {
      throw new Error(NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE);
    }
  }

  @Listen('translationEntriesUpdated')
  async entriesUpdated() {
    console.debug(this.translatorInstance);
    this.currValue = await this.translatorInstance.translateKey(this.name, this.value);
  }

  render() {
    return <Host innerHTML={this.currValue} />;
  }
}
