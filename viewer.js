const images = {
  Kitchen: 'assets/Kitchen.jpg',
  Living_Room: 'assets/Living_Room.jpg',
  Bedroom: 'assets/Bedroom.jpg',
  Bathroom: 'assets/Bathroom.jpg',
  Reception: 'assets/Reception.jpg',
  Corridor: 'assets/Corridor.jpg'
};

const hotspotsMap = {
  Living_Room: [
    { target: 'Kitchen', x: 0.3, y: 0.4 },
    { target: 'Reception', x: 0.6, y: 0.2 },
    { target: 'Corridor', x: 0.8, y: 0.5 }
  ],
  Kitchen: [
    { target: 'Living_Room', x: 0.5, y: 0.5 }
  ],
  Reception: [
    { target: 'Living_Room', x: 0.4, y: 0.6 }
  ],
  Corridor: [
    { target: 'Bathroom', x: 0.2, y: 0.3 },
    { target: 'Bedroom', x: 0.7, y: 0.4 },
    { target: 'Living_Room', x: 0.5, y: 0.7 }
  ],
  Bathroom: [
    { target: 'Corridor', x: 0.5, y: 0.5 }
  ],
  Bedroom: [
    { target: 'Corridor', x: 0.6, y: 0.6 }
  ]
};

let viewer = new PhotoSphereViewer.Viewer({
  container: document.querySelector('#viewer'),
  panorama: images.Living_Room,
  navbar: ['zoom', 'fullscreen'],
  defaultYaw: '130deg',
  plugins: [
    [PhotoSphereViewer.MarkersPlugin]
  ]
});

const markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);

function setMarkers(scene) {
  markersPlugin.clearMarkers();

  const hotspots = hotspotsMap[scene] || [];

  hotspots.forEach((hotspot, i) => {
    markersPlugin.addMarker({
      id: `${scene}_to_${hotspot.target}`,
      tooltip: `Go to ${hotspot.target.replace('_', ' ')}`,
      image: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      width: 32,
      height: 32,
      x: hotspot.x,
      y: hotspot.y,
      anchor: 'bottom center',
      data: { target: hotspot.target }
    });
  });
}

viewer.on('ready', () => {
  setMarkers('Living_Room');
});

viewer.on('select-marker', (e) => {
  const target = e.marker.data.target;
  if (target) {
    viewer.setPanorama(images[target]).then(() => {
      setMarkers(target);
    });
  }
});
