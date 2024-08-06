import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { useStore } from "~/lib/store";

export function UI() {
  const [timeFormat, setTimeFormat, units, setUnits] = useStore((state) => [
    state.timeFormat,
    state.setTimeFormat,
    state.units,
    state.setUnits,
  ]);

  const handleSetTimeFormat = () => {
    timeFormat === "24" ? setTimeFormat("12") : setTimeFormat("24");
  };

  const handleSetUnits = () => {
    units === "imperial" ? setUnits("metric") : setUnits("imperial");
  };

  return (
    <div className="absolute z-10 right-5 top-5 flex flex-col items-center space-y-3">
      <UserButton />
      <Button onClick={handleSetTimeFormat}>Time format: {timeFormat}</Button>
      <Button onClick={handleSetUnits}>Units: {units}</Button>
    </div>
  );
}
