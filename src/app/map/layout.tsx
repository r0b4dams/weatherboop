import { type PropsWithChildren } from "react";

import { UserInterface } from "~/components/UserInterface";

export default function MapPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      {/* <UserInterface /> */}
      {children}
    </>
  );
}
