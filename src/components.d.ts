/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { TranslationLoader } from "./utils/translation-loader";
import { Transpiler } from "./utils/transpiler";
import { LanguageScopedTranslationEntry, TranslationEntry } from "./utils/translation-entry";
export namespace Components {
    interface KryptandTranslate {
        /**
          * The key you set in your translation file. {    "hello":"Hallo Welt" }
         */
        "name": string;
        /**
          * The value you want to insert into your string. {    "hello":"Hallo {{value}}" }
         */
        "value": any;
    }
    interface KryptandTranslationProvider {
        /**
          * add translation entities
          * @param translationEntries The entities you want to add.
          * @param lang The language the entries are valid for.  this method can be used to provide translation entities at runtime e.g. when loaded from a dynamic source
         */
        "addTranslationEntries": (translationEntries: TranslationEntry[], lang?: string) => Promise<void>;
        /**
          * change the current language
          * @param identifier language-identifier.
         */
        "changeLang": (identifier: string) => Promise<void>;
        /**
          * The default language If no language is provided the browsers fallback is used.
         */
        "defaultLang": string;
        /**
          * loads translation entries with the provided @prop translation loader
          * @param lang The language of the desired entries.  this method can be used to provide translation entities at runtime e.g. when loaded from a dynamic source
         */
        "loadTranslationEntriesForLang": (lang: string) => Promise<void>;
        /**
          * The Translation Loader instance The translation loader is used to load remote translation entries. If no loader is provided the default one is used. The default translation loader caches your translation keys. The default directory that is used for loading is assets/i18n/{LANGUAGE-IDENTIFIER}.
         */
        "loader": TranslationLoader;
        /**
          * retrieve the translated value for the desired key
          * @param key The identifier you specified in your translation file.
          * @param value If you use value placeholders you can set the desired value here e.g. {{value}}
         */
        "translateKey": (key: string, value?: any) => Promise<string>;
        /**
          * The transpiler instance A transpiler is used to fill template strings in given translation entities with a value. The default implementation replaces {{value}} with a string representation.
         */
        "transpiler": Transpiler;
    }
}
declare global {
    interface HTMLKryptandTranslateElement extends Components.KryptandTranslate, HTMLStencilElement {
    }
    var HTMLKryptandTranslateElement: {
        prototype: HTMLKryptandTranslateElement;
        new (): HTMLKryptandTranslateElement;
    };
    interface HTMLKryptandTranslationProviderElement extends Components.KryptandTranslationProvider, HTMLStencilElement {
    }
    var HTMLKryptandTranslationProviderElement: {
        prototype: HTMLKryptandTranslationProviderElement;
        new (): HTMLKryptandTranslationProviderElement;
    };
    interface HTMLElementTagNameMap {
        "kryptand-translate": HTMLKryptandTranslateElement;
        "kryptand-translation-provider": HTMLKryptandTranslationProviderElement;
    }
}
declare namespace LocalJSX {
    interface KryptandTranslate {
        /**
          * The key you set in your translation file. {    "hello":"Hallo Welt" }
         */
        "name"?: string;
        /**
          * The value you want to insert into your string. {    "hello":"Hallo {{value}}" }
         */
        "value"?: any;
    }
    interface KryptandTranslationProvider {
        /**
          * The default language If no language is provided the browsers fallback is used.
         */
        "defaultLang"?: string;
        /**
          * The Translation Loader instance The translation loader is used to load remote translation entries. If no loader is provided the default one is used. The default translation loader caches your translation keys. The default directory that is used for loading is assets/i18n/{LANGUAGE-IDENTIFIER}.
         */
        "loader"?: TranslationLoader;
        /**
          * The event is fired when the language is changed. The current language gets emitted.
         */
        "onLanguageChanged"?: (event: CustomEvent<string>) => void;
        /**
          * The event is triggered when entries are added
         */
        "onTranslationEntriesUpdated"?: (event: CustomEvent<LanguageScopedTranslationEntry>) => void;
        /**
          * The transpiler instance A transpiler is used to fill template strings in given translation entities with a value. The default implementation replaces {{value}} with a string representation.
         */
        "transpiler"?: Transpiler;
    }
    interface IntrinsicElements {
        "kryptand-translate": KryptandTranslate;
        "kryptand-translation-provider": KryptandTranslationProvider;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "kryptand-translate": LocalJSX.KryptandTranslate & JSXBase.HTMLAttributes<HTMLKryptandTranslateElement>;
            "kryptand-translation-provider": LocalJSX.KryptandTranslationProvider & JSXBase.HTMLAttributes<HTMLKryptandTranslationProviderElement>;
        }
    }
}
