# Apply Colors to Selection
A Figma plugin to take a set of colours and randomly apply them to a selection.

![](./assets/figma-apply-colors-to-selection.gif)

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.ts`.

These are compiled to files in `dist/`, which are what Figma will use to run
your plugin.

## Build instructions
First clone the repository and install the dev dependencies:

```
git clone git@github.com:craigmdennis/figma-random-color.git
cd figma-apply-colors-to-selection
npm install
```

Then compile the source files:

```
npm run watch
```
