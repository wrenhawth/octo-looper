# 🐙🔁 OctoLooper 🔁🐙

OctoLooper is a music composition tool designed to be fun and accessible for young children. It was inspired by research on Creativity Support Tools (CST) and their ability to lower thresholds for creative projects. It began as a semester-long project for my [Educational Technology course](https://omscs6460.gatech.edu/) at Georgia Tech as part of the [OMSCS program](https://omscs.gatech.edu/), but I hope to continue to iterate and improve on this initial version.

## Screenshots
<img width="200" alt="image" src="https://github.com/user-attachments/assets/60ff2480-c073-4975-842d-37c32884258e">
<img width="300" alt="image" src="https://github.com/user-attachments/assets/c184e128-d61d-4759-9d6c-1661110693e6">
<img width="180" alt="image" src="https://github.com/user-attachments/assets/1206653f-769e-4aa8-be40-95acd7708e9f">

## Live Demo

OctoLooper can be accessed through a ✨[Live Demo](https://wrenhawth.github.io/octo-looper/)✨ hosted on GitHub Pages

## Running Locally

OctoLooper can also be run locally using the following commands:

```
npm install
npm run dev
```

## Features

OctoLooper separates the creative process for creating a short musical loop into a number of simplified steps:

### Steps

1. **Name**: Users can select a randomly generated simple name or manually input a name for the song they're creating
2. **Drums**: The tempo can be adjusted and the backing rhythm can be selected from a number of preset patterns
3. **Chords**: Chords in the loop's [chord progression](https://en.wikipedia.org/wiki/Chord_progression) can be toggled from a set of [basic triad chords](https://en.wikipedia.org/wiki/Triad_(music)). Options for rhythmic patterns and arpeggios are also available.
4. **Sing**: The melodic step of the process is currently simply an encouragement for the user to try singing along with the musical loop. A space is available to type lyrics
5. **Share**: Optionally, the song created can be shared through a URL, which when accessed by another user will load the same musical parameters.

## Architecture

* This version of OctoLooper is built as a [React](https://react.dev/) application with [Typescript](https://www.typescriptlang.org/), supported with [Vite](https://vitejs.dev/) build tooling.
* [Tone.js](https://tonejs.github.io/) is used for Web Audio sound generation and the timing and synchronization of web audio events. The app is built using a combination of [sampled](https://github.com/Tonejs/Tone.js?tab=readme-ov-file#tonesampler) and [synthesized](https://github.com/Tonejs/Tone.js?tab=readme-ov-file#instruments) sounds.
* [Pixi.js](https://pixijs.com/) (specifically [Pixi-React](https://pixijs.io/pixi-react/)) is used to build some of the more complicated animations and interactive elements on a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element.

## Credits and Thanks
* Sample sounds were sourced from the freely available [Ultimate Boom Bap Drum Kit](https://soundpacks.com/free-sound-packs/ultimate-boom-bap-drum-kit/) and [Sample Pi](https://github.com/alex-esc/sample-pi) sample packs.
* <a href="https://www.freepik.com/free-vector/psychedelic-music-covers-60-s-70-s-style_9427916.htm#query=ocean%20cartoon%20background&position=9&from_view=keyword&track=ais_user&uuid=aca952f8-2402-4097-a4b5-baabef368312https:/downloadscdn5.freepik.com/download_vector/jpg/0/23/9/9427/9427916_4173921.jpg?token=exp=1720163738~hmac=0e27451574c6f80e55e4c2f5a9db71fd">Background Image by freepik</a>
