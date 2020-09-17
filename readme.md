# TRANS.mono
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![npm version](https://badge.fury.io/js/%40kryptand%2Ftransmono.svg)](https://badge.fury.io/js/%40kryptand%2Ftransmono)
[![NPM](https://nodei.co/npm/@kryptand/transmono.png)](https://npmjs.org/package/@kryptand/transmono)

TRANS.mono is a customizable and easy to use dependency free, web-component based translation library.
It can be used in other web component based projects, Angular, React, Vue or Ember.
Currently the library is a build in progress and the API is subject to change.

# Installation
```
npm install @kryptand/transmono
```

## Web components
Import the components directly either by providing a script tag for example :
`<script type="module" src='https://cdn.jsdelivr.net/npm/@kryptand/transmono@0.0.4/dist/index.js'></script>`
or if you installed the package via npm import the package inside your root component - for example:
`import "@kryptand/transmono"`;

## Stencil
Switch to your root component, if you use the stencil CLI to generate your project, this file can usually be found at the following location: ``src/components/global/app.ts``.

`import` within the root component: `import "@kryptand/transmono"`;

## Angular
look up https://stenciljs.com/docs/angular

## React
look up https://stenciljs.com/docs/react

## Vue
look up https://stenciljs.com/docs/vue

## Ember
look up https://stenciljs.com/docs/ember

# Usage
## Register the provider
In the root component of your project create an instance of the translation provider.
[...]
``
<kryptand-translation-provider defaultLang="de-DE">  
</kryptand-translation-provider>
`` 
[...]
Specify the default language - for example ``de-DE``
There are a lot of other inputs you can use to further customize your provider. Look up the [Provider documentation](https://github.com/Kryptand/transmono/blob/master/src/components/kryptand-translation-provider/readme.md)  for further information. 

## Translate keys
To translate text in your application use the ``<kryptand-translate></kryptand-translate>`` Component.
The most basic implementation would be as following:
``
<kryptand-translate name="translationKey" value="World"></kryptand-translate>
``
For further information consult the  [component documentation](https://github.com/Kryptand/transmono/blob/master/src/components/kryptand-translate/readme.md).
## Provide translation files
TRANS.mono default translation loader looks for translation files in the .json format.
The default lookup URL is ``[BASE_URL]/assets/i18n/[CURRENT_LANG].json`` 

Translation files follow a simple key value pattern. For example your file could look like this:
``
{  
  "translationKey": "Hallo, {{value}}"  
}
``
Placeholders in your translation texts can be provided as well. To insert a placeholder use the ``{{PLACEHOLDER}}`` syntax.
# Advanced Usage
As stated in the introduction TRANS.mono gives you the flexibility to customize every bit if you need it.
## Roll your own Translation Loader
If you want to load translation files that are not in the .json Format or you have a remote location you want to store your files on you can create your own translation loader.

There will be further information coming soon™. 

## Add translation entities at runtime

There will be further information coming soon™. 