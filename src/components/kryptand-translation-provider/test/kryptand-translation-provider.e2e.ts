import { newE2EPage } from '@stencil/core/testing';

describe('kryptand-translation-provider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kryptand-translation-provider></kryptand-translation-provider>');

    const element = await page.find('kryptand-translation-provider');
    expect(element).toHaveClass('hydrated');
  });
});
