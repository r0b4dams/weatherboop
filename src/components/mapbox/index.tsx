"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl, { type LngLatLike } from "mapbox-gl";

import { Popup } from "~/components/popup";
import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./styles";
import { getData } from "./actions";

const popup = new mapboxgl.Popup({ closeOnClick: false });
popup
  .setHTML("<div id='weatherboop-popup'></div>")
  .setLngLat([0, 0])
  .setOffset(35)
  .setMaxWidth("300");
popup.addClassName("hidden");

export const Mapbox: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapboxgl.supported()) {
      alert("Your browser does not support Mapbox GL");
      return;
    }

    const map = new mapboxgl.Map({
      accessToken: MAPBOX_PUBLIC_KEY,
      style: MAPBOX_STYLE.OUTDOORS,
      projection: { name: "globe" },
      container: mapContainer.current!,
      center: [0, 0],
      zoom: 5,
    });

    const marker = new mapboxgl.Marker();

    popup.addTo(map);
    const popupRoot = createRoot(popup.getElement());

    map.once("click", () => {
      popup.removeClassName("hidden");
    });

    map.on("click", async (e) => {
      const coords: LngLatLike = [e.lngLat.lng, e.lngLat.lat];

      // update view
      map.flyTo({ center: coords, speed: 0.5 });

      //update marker
      marker.setLngLat(coords).addTo(map);

      // update popup
      popup.setLngLat(coords);
      popupRoot.render(<div>LOADING</div>);
      const data = await getData(coords); // server action
      setTimeout(() => {
        popupRoot.render(
          <Popup
            lng={e.lngLat.lng}
            lat={e.lngLat.lat}
            current={data.current!}
            geo={data.geo!}
          />,
        );
      }, 1500);
    });

    return () => {
      popup.remove();
      marker.remove();
      map.remove();
    };

    // This hook should only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 " ref={mapContainer} />
    </>
  );
};
