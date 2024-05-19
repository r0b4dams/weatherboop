import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Mapbox, Sidebar } from "~/components";

export default async function Home() {
  return (
    <>
      <SignedIn>
        <Sidebar />
        <Mapbox />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal" />
        <SignUpButton mode="modal" />
      </SignedOut>
    </>
  );
}
