const modelViewer = document.querySelector('#product-model');
const orbitCycle = [
  '40deg 45deg 115%',
  ''
];

// const orientationCycle = [
//   '0deg 10deg 0deg',
//   '0deg 0deg 0deg'
// ];

setInterval(() => {
  const currentOrbitIndex = orbitCycle.indexOf(modelViewer.cameraOrbit);
  // modelViewer.orientation = orientationCycle[(currentOrbitIndex + 1) % orientationCycle.length]
  modelViewer.cameraOrbit =
      orbitCycle[(currentOrbitIndex + 1) % orbitCycle.length];
}, 3000);