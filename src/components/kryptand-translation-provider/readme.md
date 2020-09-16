# kryptand-translation-provider



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                            | Type                | Default                          |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | -------------------------------- |
| `defaultLang` | `default-lang` | The default language If no language is provided the browsers fallback is used.                                                                                                                                                                                                                         | `string`            | `undefined`                      |
| `loader`      | --             | The Translation Loader instance The translation loader is used to load remote translation entries. If no loader is provided the default one is used. The default translation loader caches your translation keys. The default directory that is used for loading is assets/i18n/{LANGUAGE-IDENTIFIER}. | `TranslationLoader` | `new DefaultTranslationLoader()` |
| `transpiler`  | --             | The transpiler instance A transpiler is used to fill template strings in given translation entities with a value. The default implementation replaces {{value}} with a string representation.                                                                                                          | `Transpiler`        | `new DefaultTranspiler()`        |


## Events

| Event                       | Description                                                                         | Type                                           |
| --------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| `languageChanged`           | The event is fired when the language is changed. The current language gets emitted. | `CustomEvent<string>`                          |
| `translationEntriesUpdated` | The event is triggered when entries are added                                       | `CustomEvent<Map<string, TranslationEntries>>` |


## Methods

### `addTranslationEntries(translationEntries: TranslationEntry[], lang?: string) => Promise<void>`

add translation entities

#### Returns

Type: `Promise<void>`



### `changeLang(identifier: string) => Promise<void>`

change the current language

#### Returns

Type: `Promise<void>`



### `loadTranslationEntriesForLang(lang: string) => Promise<void>`

loads translation entries with the provided @prop translation loader

#### Returns

Type: `Promise<void>`



### `translateKey(key: string, value?: any) => Promise<string>`

retrieve the translated value for the desired key

#### Returns

Type: `Promise<string>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
