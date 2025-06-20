"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@civic/auth/react";
import { StateDistrictForm } from "./statedistrictform";
import Webcam from "react-webcam";

export default function SignupForm() {
  const router = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!user?.email;
  const webcamRef = useRef<Webcam>(null);

  const [authEmail, setAuthEmail] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    voterId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    state: "",
    district: "",
    phone: "",
    aadhaar: null as File | null,
  });

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setAuthEmail(user.email);
      console.log("✅ Civic Auth Email:", user.email);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("❗ Please authenticate using Civic first.");
      return;
    }

    if (formData.email !== authEmail) {
      alert("❗ Entered email does not match authenticated Civic email.");
      return;
    }

    console.log("✅ Emails match. Opening webcam...");
    setShowWebcam(true);
  };

  const submitToDatabase = async (faceVerified: boolean) => {
    try {
      const payload = {
        voterId: formData.voterId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        state: formData.state,
        district: formData.district,
        faceVerified,
      };

      const response = await fetch("/api/submit-voter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Submitted to DB:", result);
        localStorage.setItem("voterId", formData.voterId);
        router.push("/panel");
      } else {
        console.error("❌ Failed:", result.message);
        alert(`Failed to submit: ${result.message}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Network or server error. Please try again.");
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setShowWebcam(false);
      console.log("📸 Captured Image:", imageSrc);
      submitToDatabase(true);
    }
  };

  const skipPhoto = () => {
    console.log("⏭️ Skipping photo capture...");
    submitToDatabase(false);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-20">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">LOKAWAAZ</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        LokAwaaz lets you vote safely from home using your Voter ID and face scan.
      </p>

      {showWebcam ? (
        <div className="flex flex-col items-center mt-6">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: 400, height: 300, facingMode: "user" }}
            onUserMedia={() => console.log("📷 Webcam ready")}
            onUserMediaError={(err) => console.error("🚨 Webcam error:", err)}
            style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={capturePhoto}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Capture Photo
            </button>
            <button
              onClick={skipPhoto}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Skip
            </button>
          </div>
        </div>
      ) : (
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="voterid">Voter ID</Label>
            <Input
              id="voterid"
              type="text"
              required
              value={formData.voterId}
              onChange={(e) => setFormData({ ...formData, voterId: e.target.value })}
            />
          </LabelInputContainer>

          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="middlename">Middle name</Label>
              <Input
                id="middlename"
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
             <StateDistrictForm
                onStateChange={(state) => setFormData({ ...formData, state })}
                onDistrictChange={(district) => {
                setFormData({ ...formData, district });

                // ✅ Save district to localStorage
                localStorage.setItem("userDistrict", district);
                }}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="aadhaar">Upload Aadhaar Card</Label>
            <Input
              id="aadhaar"
              type="file"
              accept="image/*,application/pdf"
              required
              onChange={(e) => setFormData({ ...formData, aadhaar: e.target.files?.[0] || null })}
            />
          </LabelInputContainer>

          <div className="mb-8">
            <UserButton />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white hover:bg-gray-700 transition mt-6"
          >
            Submit
          </button>
        </form>
      )}

      {capturedImage && (
        <div className="mt-4">
          <p className="text-green-600">✅ Photo captured successfully</p>
          <img src={capturedImage} alt="Captured" className="rounded-md mt-2" />
        </div>
      )}
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
