// components/common/WithAuth.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isUserAuthenticated } from "@/session"; // Adjust the import path if necessary

export const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const router = useRouter();
    const session = isUserAuthenticated();

    useEffect(() => {
      if (!session) {
        router.replace("/login");
      }
    }, [session, router]);

    if (!session) {
      return null; // or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };
};
