import clone from './clone'

figma.showUI(__html__)

// For the number of currently selected elements
// Get the fills
// Trim duplicates
// Create color inputs in the UI

// -----------------------------------------------

// When generating
figma.ui.onmessage = msg => {
  if (msg.type === 'generate') {
    const nodes = []
    console.log(msg.colors);

    // Get the current selection
    // For each selected object
    // Get a random color from the array
    // Apply it to the current fill

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes)
  }
}
