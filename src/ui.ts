import 'figma-plugin-ds/figma-plugin-ds.min.js'
import 'figma-plugin-ds/figma-plugin-ds.min.css'
import './ui.css'
import inputArrayFromNodeList from './inputArrayFromNodeList'

const updateColor = (event) => {
  console.log(event);

  const hex = event.target.value;

  event.target.parentElement.children[0].value = hex;
  event.target.parentElement.children[1].value = hex;
  
}

// Add a new color
const removeSwatch = (event) => {

  // const el = tsdom(event);
  const existing =  document.querySelectorAll('.swatch');
  
  // If the number of events is greater than 1
  if (event.target.classList.contains('remove') && existing.length !== 1) {
    
    // Find the parent event and remove it
    event.target.parentElement.remove();

  }
  
}

// Clone an existing swatch
const cloneSwatch = () => {
  
  // Create a clone of the color:
  const clone = document.querySelector('.swatch:last-child').cloneNode( true );

  // Append the newly created color picker
  document.querySelector('#colors').prepend( clone );
}

const postColorsToPlugin = () => {
  let colors : Array<String> = [];

  // Get an array of all the color inputs
  const elementList = inputArrayFromNodeList('.color');

  // Add color values to the array
  elementList.forEach(element => {
    colors.push(element.value);
  });

  parent.postMessage({ pluginMessage: {type: 'generate', colors }}, '*');
}

// Event listeners and callbacks
document.getElementById('add').addEventListener('click', cloneSwatch);
document.getElementById('generate').addEventListener('click', postColorsToPlugin);
document.getElementById('colors').addEventListener('click', removeSwatch);
document.getElementById('colors').addEventListener('change', updateColor);
document.getElementById('colors').addEventListener('paste', updateColor);