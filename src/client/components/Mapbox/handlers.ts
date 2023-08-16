// import type { EventData, Map, MapMouseEvent, Marker } from "mapbox-gl";
// import { AppDispatch } from "../../store";
// import { setLat, setLon, setZoom } from "../../store/map";

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

// export const updateCoords = (map: Map, dispatch: AppDispatch) => () => {
//   try {
//     const lng = parseFloat(map.getCenter().lng.toFixed(2));
//     const lat = parseFloat(map.getCenter().lat.toFixed(2));
//     const zoom = parseFloat(map.getZoom().toFixed(2));
//     dispatch(setLat(lat));
//     dispatch(setLon(lng));
//     dispatch(setZoom(zoom));
//   } catch (error) {
//     console.error(error);
//   }
// };
