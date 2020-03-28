import clone from './clone';
import chroma from '../node_modules/chroma-js/chroma'

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

figma.showUI(__html__)

// For the number of currently selected elements
// Get the fills
// Deselect current selection
// Trim duplicates
// Create color inputs in the UI

// -----------------------------------------------

// When generating
figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    const nodes = []
    console.log(msg.colors);

    // Get the current selection
    for (const node of figma.currentPage.selection) {

      if ("fills" in node) {
    
        // Get the current fills in order to clone and modify them
        const fills = clone(node.fills);
        
        // If there are no fills then create an object to matche what would have been cloned
        if (Array.isArray(node.fills) && !node.fills.length) {
          fills.push({type: "SOLID", visible: true, opacity: 1, blendMode: "NORMAL", color: {}})
        }
    
        // Get a random colour from chroma-js.
        const random = chroma(randomItem(msg.colors)).gl();

        console.log(random);
        
    
        // Create an array that matches the fill structure (rgb represented as 0 to 1)
        const newColor = {r: random[0], g: random[1], b: random[2]};
        
        // Only change the first fill
        fills[0].color = newColor;
    
        // Replace the fills on the node.
        node.fills = fills;
    
      }
    }
    // Get a random color from the array
    // Apply it to the current fill

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes)
  }
}
