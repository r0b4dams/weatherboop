"use client";

import { UserProfile } from "@clerk/nextjs";

import { DeleteAccountDialog } from "~/components/DeleteAccountDialog";
import { X } from "lucide-react";

const DeletePageContent = () => {
  return (
    <>
      <h1 className="cl-headerTitle pb-4 font-bold">Delete account</h1>
      <div className="cl-profileSection py-4 border-t">
        <DeleteAccountDialog />
      </div>
    </>
  );
};

const UserProfilePage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <UserProfile
        path="/profile"
        routing="path"
        appearance={{
          elements: { profileSection__danger: "hidden" },
        }}
      >
        <UserProfile.Page
          label="Delete"
          labelIcon={<X className="w-4 h-4" />}
          url="delete"
        >
          <DeletePageContent />
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
};

export default UserProfilePage;
