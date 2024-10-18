'use client';
import React from "react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
function Dashboard() {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) {
    return <div className="flex items-center justify-center text-black">Loading...</div>;
  }

  // If user is not signed in, redirect to the Sign-In page
  if (!userId) {
    return <RedirectToSignIn />;
  }

  // If user is signed in, render the dashboard content
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>Protected content for signed-in users only.</p>
    </div>
  );
}
export default Dashboard;
