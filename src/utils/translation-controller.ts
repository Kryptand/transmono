export class TranslationController {
  public instance: HTMLKryptandTranslationProviderElement;
  registerInstance(elem: HTMLKryptandTranslationProviderElement) {
    this.instance = elem;
  }
}
export const TranslationControllerInstance = new TranslationController();
