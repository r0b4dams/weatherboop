import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <p>Weatherboop</p>

        <div className="flex flex-col">
          <SignInButton mode="modal">
            <button>Sign in with Clerk</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button>Register with Clerk</button>
          </SignUpButton>
        </div>
      </div>
    </>
  );
}
