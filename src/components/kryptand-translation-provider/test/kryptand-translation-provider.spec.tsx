import { newSpecPage } from '@stencil/core/testing';
import { TranslationProvider } from '../kryptand-translation-provider';
import { Translate } from '../../kryptand-translate/kryptand-translate';

describe('kryptand-translation-provider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TranslationProvider],
      html: `<kryptand-translation-provider></kryptand-translation-provider>`,
    });
    expect(page.root).toEqualHtml(`
      <kryptand-translation-provider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kryptand-translation-provider>
    `);
  });
});
