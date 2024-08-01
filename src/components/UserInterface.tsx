import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function UserInterface() {
  return (
    <div className="absolute z-10 right-5 top-5 flex flex-col items-center">
      <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
      <Button>Time</Button>
    </div>
  );
}
