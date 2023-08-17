import type { EventData, Map, MapMouseEvent, Marker } from "mapbox-gl";
import type { AppDispatch } from "../../store/actions";
import { setLng, setLat, setZoom } from "../../store/actions";

export const boop = (map: Map, marker: Marker) => (e: MapMouseEvent & EventData) => {
  try {
    marker.remove().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
  } catch (error) {
    console.error(error);
  }
};

export const focus = (map: Map) => (e: MapMouseEvent & EventData) => {
  try {
    map.flyTo({
      center: [e.lngLat.lng, e.lngLat.lat],
      speed: 0.5,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateCoordinates = (map: Map, dispatch: AppDispatch) => () => {
  const lng = parseFloat(map.getCenter().lng.toFixed(2));
  const lat = parseFloat(map.getCenter().lat.toFixed(2));
  const zoom = parseFloat(map.getZoom().toFixed(2));
  dispatch(setLng(lng));
  dispatch(setLat(lat));
  dispatch(setZoom(zoom));
};
