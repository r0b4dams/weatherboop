import { type PropsWithChildren } from "react";

import { UI } from "~/components";

export default function MapPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <UI />
      {children}
    </>
  );
}
