"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOGOUT_URL, USER_DETAIL_URL } from "@/helpers/constant";

export default function ProfilePage() {

  const router = useRouter();
  const [data, setData] = useState("nothing");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const logout = async () => {
    try {
      console.log("Logging out...");
      const response = await axios.get(API_URL + LOGOUT_URL);
      console.log("Logout response:", response);
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const getUserDetails = async () => {
    try {
      console.log("Fetching user details...");
      const response = await axios.get(API_URL + USER_DETAIL_URL);
      console.log("User details response:", response);
      setData(response.data.data._id);
    } catch (error: any) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col"
      style={{ background: "rgb(17,24,39)" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
          <h1 className="text-white py-3">Profile</h1>
          <hr />
          <div className="justify-center">
            <p className="text-white">Profile Page</p>
            <h2 className="p-3 rounded bg-green-500">
              {data === "nothing" ? (
                "Nothing"
              ) : (
                <Link href={`/profile/${data}`}>{data}</Link>
              )}
            </h2>
          </div>
          <hr />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
            onClick={getUserDetails}
          >
            Get User Details
          </button>
          <button
            className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
