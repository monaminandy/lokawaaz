"use client";
import { useState, useEffect } from "react";

type Candidate = {
  canid: string; // your DB field
  name: string;
  party: string;
  district: string;
};

export default function CandidateList({
  userDistrict,
  voterId,
}: {
  userDistrict: string;
  voterId: string;
}) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Fetch candidates in this district
    fetch("/api/candidates", {
      method: "POST",
      body: JSON.stringify({ district: userDistrict }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.candidates) {
          setCandidates(data.candidates);
        }
      });

    // Fetch voter status
    fetch(`/api/voter?voterId=${voterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.voter?.hasVoted) {
          setHasVoted(true);
        }
      });
  }, [userDistrict, voterId]);

  const handleVote = async (candidateId: string) => {
    const res = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        voterId: voterId,
        candidateId: candidateId, // ✅ correct field
        district: userDistrict,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("✅ Vote recorded successfully!");
      setHasVoted(true);
    } else {
      alert("⚠️ " + (data.message || "Vote failed"));
    }
  };

  return (
    <div>
      <h2 className="text-xl text-primary font-bold mb-4">
        Candidates in {userDistrict}
      </h2>
      <ul className="space-y-4">
        {candidates.map((candidate) => (
          <li
            key={candidate.canid}
            className="p-4 border border-primary max-w-2xl rounded mx-auto"
          >
            <div className="flex justify-between items-center max-w-2xl">
              <div>
                <p>
                  <strong>Name: {candidate.name}</strong>
                </p>
                <p>Party: {candidate.party}</p>
              </div>
              <div>
                <button
                  onClick={() => handleVote(candidate.canid)}
                  disabled={hasVoted}
                  className={`${
                    hasVoted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-gray-700 dark:bg-white"
                  } rounded-full text-white dark:text-black px-6 py-3`}
                >
                  {hasVoted ? "Voted" : "Vote"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
