import { type Map } from "mapbox-gl";
import { type AppDispatch } from "../../store/actions";
// import { setLat, setLng, setZoom } from "../../store/actions";
// import { AppDispatch } from "../../store";
import { setLng, setLat, setZoom } from "../../store/actions";

// export const flyToBoop = (map: Map) => (e: MapMouseEvent & EventData) => {
//   try {
//     map.flyTo({
//       center: [e.lngLat.lng, e.lngLat.lat],
//       zoom: 7,
//       speed: 0.2,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const updateBoop = (map: Map, marker: Marker) => (e: MapMouseEvent & EventData) => {
//   try {
//     marker.remove().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateCoordinates = (map: Map, dispatch: AppDispatch) => () => {
  const lng = parseFloat(map.getCenter().lng.toFixed(2));
  const lat = parseFloat(map.getCenter().lat.toFixed(2));
  const zoom = parseFloat(map.getZoom().toFixed(2));
  dispatch(setLng(lng));
  dispatch(setLat(lat));
  dispatch(setZoom(zoom));
};
