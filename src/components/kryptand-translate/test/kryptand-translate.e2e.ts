import { newE2EPage } from '@stencil/core/testing';

describe('kryptand-translate', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kryptand-translate></kryptand-translate>');

    const element = await page.find('kryptand-translate');
    expect(element).toHaveClass('hydrated');
  });
});
