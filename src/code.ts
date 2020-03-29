import getSelectionFills from './get-selection-fills';
import createSwatches from './create-swatches';

figma.showUI(__html__, { width: 300, height: 296 })

const current = getSelectionFills(figma.currentPage.selection, true);
figma.ui.postMessage(current);

// -----------------------------------------------

// Apply Colors
figma.ui.onmessage = msg => {
  if (msg.type === 'apply') {

    // If nothing selected
    if (figma.currentPage.selection.length === 0) {
      
      // Notify in the UI
      figma.notify('Nothing selected.');

    }

    // If the user has selected something
    else {

      // Build the swatches using the selection fills
      createSwatches(figma.currentPage.selection, msg)
    }
  }
}
