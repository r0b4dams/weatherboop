"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";

import { deleteUser } from "./_actions";
import { CloseIcon } from "~/components/CloseIcon";

const UserProfilePage = () => {
  const { userId, sessionId } = useAuth();

  const handleDelete = async () => {
    if (!userId) {
      return;
    }
    try {
      await deleteUser(userId, sessionId);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <UserProfile
        path="/profile"
        routing="path"
        appearance={{
          elements: { profileSection__danger: "hidden" },
        }}
      >
        <UserProfile.Page label="Delete" labelIcon={<CloseIcon />} url="delete">
          {/* TODO: add dialog to prompt user if they are sure */}
          <div>
            <button onClick={handleDelete}>Delete Account</button>
          </div>
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
};

export default UserProfilePage;
