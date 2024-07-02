"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LOGOUT_URL, USER_DETAIL_URL } from "@/helpers/constant";

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
}

export default function UserProfilePage({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);

  const getUserDetails = async () => {
    try {
      console.log("Fetching user details...");
      const response = await axios.get(USER_DETAIL_URL);
      console.log("User details response:", response);
      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        console.error("Unexpected response format:", response);
        toast.error("Unexpected response format. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col"
      style={{ background: "rgb(17,24,39)" }}
    >
      <div className="flex flex-col items-center justify-center py-2">
        <p className="text-4xl text-white my-4 ">Profile Page</p>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white ">
          {data?._id ? (
            <div>
              <strong>ID:</strong> {data._id}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data?.username ? (
            <div>
              <strong>Username:</strong> {data.username}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data?.email ? (
            <div>
              <strong>Email:</strong> {data.email}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data?.isVerified !== undefined ? (
            <div>
              <strong>Verified:</strong> {data.isVerified ? "Yes" : "No"}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <Link
          href="/profile"
          className="text-md font-semibold hover:text-indigo-500 ml-2 no-underline  text-indigo-600"
        >
          Click For Home
        </Link>
      </div>
    </section>
  );
}
