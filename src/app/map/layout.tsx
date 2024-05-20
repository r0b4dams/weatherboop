import { UserButton } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";

export default function MapPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}

function Menu() {
  return (
    <div className="absolute z-10 right-5 top-5">
      <UserButton />
    </div>
  );
}
