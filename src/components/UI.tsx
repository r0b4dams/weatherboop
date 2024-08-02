import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { useStore } from "~/lib/store";

export function UI() {
  const [timeFormat, setTimeFormat] = useStore((state) => [
    state.timeFormat,
    state.setTimeFormat,
  ]);

  const handleUpdateTimeFormat = () => {
    timeFormat === "24" ? setTimeFormat("12") : setTimeFormat("24");
  };

  return (
    <div className="absolute z-10 right-5 top-5 flex flex-col items-center">
      <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
      <Button onClick={handleUpdateTimeFormat}>Time format: {timeFormat}</Button>
    </div>
  );
}
