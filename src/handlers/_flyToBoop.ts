const flyToBoop =
  (map: mapboxgl.Map) => (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    try {
      map.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 10,
        speed: 0.2,
      });
    } catch (error) {
      console.error(error);
    }
  };

export default flyToBoop;
