import './ui.css'

document.getElementById('generate').onclick = () => {

  let nodeList : NodeList = document.querySelectorAll('.color');
  let elementList : Array<HTMLInputElement> = [];
  let colors : Array<String> = [];

  if (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      let node : Node = nodeList[i];

      // Make sure it's really an Element
      if (node.nodeType == Node.ELEMENT_NODE) {
        elementList.push(node as HTMLInputElement);
      }
    }
  }

  elementList.forEach(element => {
    colors.push(element.value);
  });

  parent.postMessage({ pluginMessage: {type: 'generate', colors }}, '*');
}