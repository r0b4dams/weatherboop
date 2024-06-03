import "./map-loader-styles.css";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";

export function MapboxLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col z-[999] absolute top-0 right-0 bottom-0 left-0 justify-center items-center bg-white">
      <div className="loader"></div>
      {show && (
        <div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      )}
    </div>
  );
}
