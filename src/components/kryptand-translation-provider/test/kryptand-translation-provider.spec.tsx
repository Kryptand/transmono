import { newSpecPage } from '@stencil/core/testing';
import { KryptandTranslationProvider } from '../kryptand-translation-provider';

describe('kryptand-translation-provider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KryptandTranslationProvider],
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
