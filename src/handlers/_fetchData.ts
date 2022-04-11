import { getUrl } from "../utils";
const fetchData =
  () => async (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    try {
      const url = getUrl(e.lngLat.lng, e.lngLat.lat);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

export default fetchData;
