"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LOGOUT_URL, USER_DETAIL_URL } from "@/helpers/constant";

export default function UserProfilePage({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState(null);

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
          {data ? (
            <div>
              <strong>ID:</strong> {data._id}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data ? (
            <div>
              <strong>Username:</strong> {data?.username}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data ? (
            <div>
              <strong>Email:</strong> {data?.email}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
        <h2 className="p-3 m-3 rounded bg-green-500 text-white">
          {data ? (
            <div>
              <strong>Verified:</strong> {data?.isVerified ? "Yes" : "No"}
            </div>
          ) : (
            "Not Available"
          )}
        </h2>
      </div>
    </section>
  );
}
