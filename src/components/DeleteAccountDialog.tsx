"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { deleteUser } from "~/lib/actions";

const DELETE_ACCOUNT = "Delete account";

export function DeleteAccountDialog() {
  const { userId, sessionId } = useAuth();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const canSubmit = text === DELETE_ACCOUNT;

  const resetInput = () => {
    setText("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      setIsDeleting(false);
      return;
    }

    if (!userId) {
      setIsDeleting(false);
      throw new Error("UserId not found");
    }

    try {
      setIsDeleting(true);
      await deleteUser(userId, sessionId);
      window.location.replace("/");
    } catch (error) {
      setIsDeleting(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to delete account",
      });
    }
  };

  return (
    <Dialog onOpenChange={resetInput}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account?
          </DialogDescription>
          <DialogDescription className="text-red-500">
            This action is permanent and irreversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleDelete} className="grid flex-1 gap-2">
            <Label htmlFor="delete-input" className="pb-2">
              {'Type "Delete account" below to continue.'}
            </Label>
            <div className="flex gap-2">
              <Input
                id="delete-input"
                value={text}
                onChange={handleChange}
                placeholder="Delete account"
              />
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeleting || !canSubmit}
              >
                {isDeleting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </Button>
            </div>
          </form>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
