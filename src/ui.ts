import 'figma-plugin-ds/figma-plugin-ds.min.js'
import 'figma-plugin-ds/figma-plugin-ds.min.css'
import chroma from '../node_modules/chroma-js/chroma';
import inputArrayFromNodeList from './inputArrayFromNodeList'
import {html, render} from '../node_modules/lit-html/lit-html';
import './ui.css'

const defaultSwatchCount = 2;

const swatch = hex => html`
  <div class="swatch">
    <input class="color" type="color" value="${hex}">
    <input class="hex" maxlength="7" placeholder="#C4C4C4" minlength="4" type="text" value="${hex}">
    <button class="remove">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.287 9.35891C10.3964 9.46829 10.3964 9.64728 10.287 9.75666L9.75666 10.287C9.64728 10.3964 9.46829 10.3964 9.35891 10.287L6.30951 7.23759L3.26011 10.287C3.15073 10.3964 2.97175 10.3964 2.86237 10.287L2.33204 9.75666C2.22265 9.64728 2.22265 9.46829 2.33204 9.35891L5.38143 6.30951L2.33204 3.26011C2.22265 3.15073 2.22265 2.97175 2.33204 2.86237L2.86237 2.33204C2.97175 2.22265 3.15073 2.22265 3.26011 2.33204L6.30951 5.38143L9.35891 2.33204C9.46829 2.22265 9.64728 2.22265 9.75666 2.33204L10.287 2.86237C10.3964 2.97175 10.3964 3.15073 10.287 3.26011L7.23759 6.30951L10.287 9.35891Z"/>
      </svg>
    </button>
  </div>
`;

// Create the selection as colors if anything is selected
onmessage = event => {
  const hex = event.data.pluginMessage;
  let markup = []

  // Check for selection
  if (Array.isArray(hex) && hex.length) {
    // Create a single array of all swatches
    hex.forEach(color => {    
      markup.push(swatch(color))
    });
  }
  
  else {

    // Create the default number of swatches with random colors
    for (let i = 0; i < defaultSwatchCount; i++) {
      markup.push(swatch(chroma.random().hex()));
    }

  }

  // Render the swatches
  render(markup, document.getElementById('colors'));

}


// Update the color piker and text field
const updateColor = event => {
  
  // Get the current target
  const hex = event.target.value;

  // Update both with the value
  event.target.parentElement.children[0].value = hex;
  event.target.parentElement.children[1].value = hex;
  
}


// Add a new color
const removeSwatch = event => {
  
  // Collect all swatches
  const existing =  document.querySelectorAll('.swatch');
  
  // If the target was the remove button and the number of swatches is greater than 1
  if (event.target.closest('.remove') && existing.length !== 1) {
    
    // Remove the swatch
    event.target.closest('.swatch').remove();

  }
  
}


// Add another swatch
const addSwatch = () => {

  // Get an array of current Swatches
  const swatches = [...document.querySelectorAll('.swatch')]
  let markup = []

  swatches.forEach(element => {
    markup.push(element)
  });

  markup.push(swatch(chroma.random().hex()))

  // Render the whole section
  render(markup, document.getElementById('colors'));

  window.scrollTo(0,document.body.scrollHeight);

}


// Send the selection to the plugin
const postColorsToPlugin = () => {
  let colors : Array<String> = [];

  // Get an array of all the color inputs
  const elementList = inputArrayFromNodeList('.color');

  // Add color values to the array
  elementList.forEach(element => {
    colors.push(element.value);
  });

  // Send the data to the plugin
  parent.postMessage({ pluginMessage: {type: 'apply', colors }}, '*');

}


// Event listeners and callbacks
document.getElementById('add').addEventListener('click', addSwatch);
document.getElementById('apply').addEventListener('click', postColorsToPlugin);
document.getElementById('colors').addEventListener('click', removeSwatch);
document.getElementById('colors').addEventListener('change', updateColor);
document.getElementById('colors').addEventListener('paste', updateColor);