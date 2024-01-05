"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { updateUsername } from "~/utils/actions/user/update-user";

export function Dialog({ open }: { open: boolean }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    router.push("/");
  }

  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  }

  function handleOpen() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      // I don't feel comfortable with this, but it works
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      router.push("/");
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      className="w-full max-w-md p-3 rounded-md"
    >
      <form
        action={updateUsername}
        method="dialog"
        className="w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-medium text-center">Edit User</h2>
        <input
          name="username"
          className="w-full p-1 border outline-none rounded-md focus:outline-none focus:border-indigo-300 transition-all duration-300"
          placeholder="Update Username"
        />
        <button
          onClick={handleClose}
          className="w-full px-5 py-2 text-sm font-semibold bg-indigo-300 active:scale-95 transition-all duration-300 text-indigo-950 rounded-md"
        >
          Save
        </button>
      </form>
    </dialog>
  );
}
