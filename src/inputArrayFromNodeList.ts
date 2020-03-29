// Create an array of HTMLInputElements from a NodeList
const inputArrayFromNodeList = (className: string) => {
  let nodeList : NodeList = document.querySelectorAll(className);
  let elementList : Array<HTMLInputElement> = [];

  if (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      let node : Node = nodeList[i];

      // Make sure it's really an Element
      if (node.nodeType == Node.ELEMENT_NODE) {
        elementList.push(node as HTMLInputElement);
      }
    }
  }

  return elementList;
}

export default inputArrayFromNodeList;