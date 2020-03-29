import chroma from '../node_modules/chroma-js/chroma';
import clone from './clone';
import randomItem from './random-item';

figma.showUI(__html__, { width: 300, height: 208 })

// Create array of currently selected fills
let initialSelectedFills = [];

// Iterate through the current selection
for (const node of figma.currentPage.selection) {

  if ("fills" in node) {

    // Convert 
    const gl = node.fills[0].color;
    const hex = chroma.gl(gl.r, gl.g, gl.b).hex();

    // Get the current fills in order to clone and modify them
    initialSelectedFills.push(hex);
    
  }
}

figma.ui.postMessage(initialSelectedFills);

// -----------------------------------------------

// When generating
figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {

    // Get the current selection
    const nodes = figma.currentPage.selection;

    // Iterate through each selection
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
    
        // Create an array that matches the fill structure (rgb represented as 0 to 1)
        const newColor = {r: random[0], g: random[1], b: random[2]};
        
        // Only change the first fill
        fills[0].color = newColor;
    
        // Replace the fills on the node.
        node.fills = fills;
    
      }
    }

    figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes)
  }
}
