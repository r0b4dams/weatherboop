import { UserButton } from "@clerk/nextjs";

export function UserInterface() {
  return (
    <div className="absolute z-10 right-5 top-5">
      <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
    </div>
  );
}
