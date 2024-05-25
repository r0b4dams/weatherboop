import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Divider } from "~/components/Divider";
import { Footer } from "~/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <Card className="m-auto w-80 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">🌤️ Weatherboop ⛈️</CardTitle>
        </CardHeader>
        <CardContent>
          <ClerkLoading>
            <div className="flex flex-col justify-between min-h-44">
              <Skeleton className="w-full h-10" />
              <Divider />
              <Skeleton className="w-full h-10" />
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <div className="flex flex-col justify-between min-h-44">
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
              <Divider text="or" />
              <SignUpButton mode="modal">
                <Button>Create new account</Button>
              </SignUpButton>
            </div>
          </ClerkLoaded>
        </CardContent>
      </Card>

      <Footer />
    </div>
  );
}
