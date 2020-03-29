import clone from './clone';
import chroma from '../node_modules/chroma-js/chroma';

const getSelectionFills = (selection, deselect: Boolean) => {
    
  // Create array of currently selected fills
  let selectedFills = [];

  // Iterate through the current selection
  for (const node of selection) {

    if ("fills" in node) {

      // Get the current fills in order to clone and modify them
      const fills = clone(node.fills);
          
      // If there are no properties on the fill
      // then skip that element (otherwise it defaults to black)
      if (Array.isArray(node.fills) && !node.fills.length) {
        continue;
      }

      // Convert 
      const gl = fills[0].color;
      const hex = chroma.gl(gl.r, gl.g, gl.b).hex();

      // Get the current fills in order to clone and modify them
      selectedFills.push(hex);

      // Deselect everything
      if (deselect) {
        figma.currentPage.selection = [];
      }
      
    }
  }

  return selectedFills;
}

export default getSelectionFills;