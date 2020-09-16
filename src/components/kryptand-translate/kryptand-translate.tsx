import { Component, Host, h, State, Method } from '@stencil/core';
import { TranslationEntries } from '../../utils/translation-entry';

@Component({
  tag: 'kryptand-translate',
  styleUrl: 'kryptand-translate.css',
  shadow: true,
})
export class KryptandTranslate {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
