import { UserButton } from "@clerk/nextjs";

export function Sidebar() {
  return (
    <div className="absolute z-10 right-0">
      <UserButton />
    </div>
  );
}
