import { Component, Host, h, State, Prop, Listen } from '@stencil/core';
import { NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE } from './constants';
import { TranslationControllerInstance } from '../../utils/translation-controller';

@Component({
  tag: 'kryptand-translate',
  styleUrl: 'kryptand-translate.css',
  shadow: false,
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
  async componentDidLoad() {
    try {
      const translatorInstance = TranslationControllerInstance.instance;
      this.translatorInstance = translatorInstance;
      this.currValue = await translatorInstance.translateKey(this.name, this.value);
    } catch (err) {
      throw new Error(NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE);
    }
  }

  @Listen('translationEntriesUpdated', { target: 'window' })
  async entriesUpdated() {
    if (this.translatorInstance == null) {
      return;
    }
    this.currValue = await this.translatorInstance.translateKey(this.name, this.value);
  }

  render() {
    return <Host innerHTML={this.currValue} />;
  }
}
