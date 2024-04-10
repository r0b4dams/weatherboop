"use client";

import NextImage from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Login, Signup } from "@/components/buttons";

export default function Home() {
  const { isLoading, error, user } = useUser();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col">
        <Login />
        <Signup />
      </div>
    );
  }

  return (
    <div>
      <NextImage
        width={150}
        height={150}
        className="rounded-full"
        src={user.picture!}
        alt={user.name!}
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
