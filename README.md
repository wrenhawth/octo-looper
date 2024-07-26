# 🐙🔁 OctoLooper 🔁🐙

OctoLooper is a music composition tool designed to be fun and accessible for young children. It was inspired by research on Creativity Support Tools (CST) and their ability to lower thresholds for creative projects. It began as a semester-long project for my [Educational Technology course](https://omscs6460.gatech.edu/) at Georgia Tech as part of the [OMSCS program](https://omscs.gatech.edu/), but I hope to continue to iterate and improve on this initial version.

## Accessing OctoLooper
✨[LIVE DEMO](https://wrenhawth.github.io/octo-looper/)✨

## Architecture

* This version of OctoLooper is built as a [React](https://react.dev/) application with [Typescript](https://www.typescriptlang.org/), supported with [Vite](https://vitejs.dev/) build tooling.
* [Tone.js](https://tonejs.github.io/) is used for Web Audio sound generation and the timing and synchronization of web audio events. The app is built using a combination of [sampled](https://github.com/Tonejs/Tone.js?tab=readme-ov-file#tonesampler) and [synthesized](https://github.com/Tonejs/Tone.js?tab=readme-ov-file#instruments) sounds. Sample sounds were sourced from the freely available [Ultimate Boom Bap Drum Kit](https://soundpacks.com/free-sound-packs/ultimate-boom-bap-drum-kit/) and [Sample Pi](https://github.com/alex-esc/sample-pi) sample packs.
* [Pixi.js](https://pixijs.com/) (specifically [Pixi-React](https://pixijs.io/pixi-react/)) is used to build some of the more complicated animations and interactive elements on a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
