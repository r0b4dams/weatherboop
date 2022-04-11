const updateBoop =
  (map: mapboxgl.Map, marker: mapboxgl.Marker) =>
  (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    try {
      marker.remove().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
    } catch (error) {
      console.error(error);
    }
  };

export default updateBoop;
