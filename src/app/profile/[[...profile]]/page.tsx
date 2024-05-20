"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";
import { deleteUser } from "./_actions";

const CloseIcon = () => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
    </svg>
  );
};

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
