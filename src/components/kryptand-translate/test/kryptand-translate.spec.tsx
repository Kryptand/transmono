import { newSpecPage } from '@stencil/core/testing';
import { Translate } from '../kryptand-translate';
import { NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE } from '../constants';
import { TranslationProvider } from '../../kryptand-translation-provider/kryptand-translation-provider';

describe('kryptand-translate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TranslationProvider, Translate],
      html: `<kryptand-translation-provider>
                <kryptand-translate name="test"></kryptand-translate>
              </kryptand-translation-provider>`,
    });
  });
  it('should throw if there is no translator instance as parent', async () => {
    const comp = new Translate();
    expect(comp.componentWillLoad()).rejects.toThrowError(NO_TRANSLATOR_INSTANCE_PROVIDED_MESSAGE);
  });
});
