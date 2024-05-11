import mapboxgl from "mapbox-gl";

export class Loader extends mapboxgl.Marker {
  constructor() {
    const element = document.createElement("div");
    element.classList.add("loader");
    super({ element });
  }
}
