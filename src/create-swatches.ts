import clone from './clone';
import chroma from '../node_modules/chroma-js/chroma';
import randomItem from './random-item';

// Get the current selection;
const setSelectionFills = (nodes, msg) => {

  // Iterate through each selection
  for (const node of nodes) {

    if ("fills" in node) {

      // Get the current fills in order to clone and modify them
      const fills = clone(node.fills);
      
      // If there are no properties on the fill
      // then create an object to match what would have been cloned
      if (Array.isArray(node.fills) && !node.fills.length) {
        fills.push({type: "SOLID", visible: true, opacity: 1, blendMode: "NORMAL", color: {}})
      }

      // Get a random colour from chroma-js and convert it to gl format
      const gl = chroma(randomItem(msg.colors)).gl();

      // Create an array that matches the fill structure (rgb represented as 0 to 1)
      const newColor = {r: gl[0], g: gl[1], b: gl[2]};
      
      // Only change the first fill
      fills[0].color = newColor;

      // Replace the fills on the node.
      node.fills = fills;

    }
  }
}

export default setSelectionFills;