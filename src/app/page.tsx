import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>
        <p>Weatherboop</p>

        <div className="flex flex-col">
          <SignedOut>
            <SignInButton mode="modal">
              <button>Sign in with Clerk</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button>Register with Clerk</button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
