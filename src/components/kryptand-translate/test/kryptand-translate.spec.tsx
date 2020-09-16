import { newSpecPage } from '@stencil/core/testing';
import { KryptandTranslate } from '../kryptand-translate';

describe('kryptand-translate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KryptandTranslate],
      html: `<kryptand-translate></kryptand-translate>`,
    });
    expect(page.root).toEqualHtml(`
      <kryptand-translate>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kryptand-translate>
    `);
  });
});
