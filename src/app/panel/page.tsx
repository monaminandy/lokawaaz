"use client";

import { useEffect, useState } from "react";
import CandidateList from "@/components/Candidatelist";

export default function VotePage() {
  const [district, setDistrict] = useState("");
  const [voterId, setVoterId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedDistrict = localStorage.getItem("userDistrict");
    const savedVoterId = localStorage.getItem("voterId");

    console.log("🔍 Reading localStorage:");
    console.log("userDistrict:", savedDistrict);
    console.log("voterId:", savedVoterId);

    if (savedDistrict && savedVoterId) {
      setDistrict(savedDistrict);
      setVoterId(savedVoterId);
      setLoading(false);
    } else {
      console.warn("❗ Missing localStorage values.");
      setLoading(false); // stop loading even if missing
    }
  }, []);

  if (loading) return <p>Loading your details...</p>;

  if (!district || !voterId)
    return <p className="text-red-600">❗ Missing voter data. Please register first.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 to-white-200 text-center p-8">
      <h1 className="text-3xl text-primary font-bold mb-6">Vote for Your Candidate</h1>
      <CandidateList userDistrict={district} voterId={voterId} />
    </div>
  );
}
