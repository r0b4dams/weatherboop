import { AppReducerAction } from "../@types/store";
import { setLng, setLat, setZoom } from "../store/actions";

const updateCoords =
  (map: mapboxgl.Map, dispatch: React.Dispatch<AppReducerAction>) =>
  (
    e: mapboxgl.MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
      mapboxgl.EventData
  ) => {
    try {
      const lng = parseFloat(map.getCenter().lng.toFixed(2));
      const lat = parseFloat(map.getCenter().lat.toFixed(2));
      const zoom = parseFloat(map.getZoom().toFixed(2));
      dispatch(setLng(lng));
      dispatch(setLat(lat));
      dispatch(setZoom(zoom));
    } catch (error) {
      console.error(error);
    }
  };

export default updateCoords;
