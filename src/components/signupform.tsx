'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '@/lib/utils';
import { useUser, UserButton } from '@civic/auth/react';
import { StateDistrictForm } from './statedistrictform';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import QRCode from 'react-qr-code';

export default function SignupForm() {
  const router = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!user?.email;

  const [authEmail, setAuthEmail] = useState('');
  const [formData, setFormData] = useState({
    voterId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    dob: '',
    state: '',
    district: '',
    phone: '',
    aadhaar: null as File | null,
  });

  const [proofs, setProofs] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestUrl, setRequestUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setAuthEmail(user.email);
      console.log('✅ Civic Auth Email:', user.email);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('❗ Please authenticate using Civic first.');
      return;
    }

    if (formData.email !== authEmail) {
      alert('❗ Entered email does not match authenticated Civic email.');
      return;
    }

    if (!formData.aadhaar) {
      //alert('❗ Please upload your Aadhaar card.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('voterId', formData.voterId);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('middleName', formData.middleName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('aadhaar', formData.aadhaar);

      const response = await fetch('/api/submit-voter', {
        method: 'POST',
        body: formDataToSend
        // body: JSON.stringify({
        //   voterId: formData.voterId,
        //   firstName: formData.firstName,
        //   middleName: formData.middleName,
        //   lastName: formData.lastName,
        //   email: formData.email,
        //   dob: formData.dob,
        //   state: formData.state,
        //   district: formData.district,
        //   phone: formData.phone,
        //   aadhaar: formData.aadhaar

        // }),
      });

      const result = await response.json();
      console.log('Result:', result);
      console.log('Result JSON:',response.json);
      if (response.ok) {
        console.log('✅ Submitted to DB:', result);
        localStorage.setItem('voterId', formData.voterId);
        router.push('/panel');
      } else {
        console.error('❌ Failed:', result.message);
        alert(`Failed to submit: ${result.message}`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      alert('❌ Network or server error. Please try again.');
    }
  };

  const getVerificationReq = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/generate-config', {
        method: 'POST'
      });
      const { reclaimProofRequestConfig } = await response.json();
      console.log('Response', response);

      const reclaimProofRequest = await ReclaimProofRequest.fromJsonString(reclaimProofRequestConfig);

      const requestUrl = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(requestUrl);

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log('✅ Successfully created proof', proofs);
          setProofs(proofs);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('❌ Verification failed', error);
          setIsLoading(false);
        },
      });

      console.log('Request URL:', requestUrl);
    } catch (error) {
      console.error('❌ Error initializing Reclaim:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-20">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">LOKAWAAZ</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        LokAwaaz lets you vote safely from home using your Voter ID and Aadhaar verification.
      </p>

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
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              const age = today.getFullYear() - selectedDate.getFullYear();
              const monthDiff = today.getMonth() - selectedDate.getMonth();
              const dayDiff = today.getDate() - selectedDate.getDate();

              const adjustedAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

              if (adjustedAge < 18) {
                alert('You must be at least 18 years old.');
                return;
              }

              setFormData({ ...formData, dob: e.target.value });
            }}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <StateDistrictForm
            onStateChange={(state) => setFormData({ ...formData, state })}
            onDistrictChange={(district) => {
              setFormData({ ...formData, district });
              localStorage.setItem('userDistrict', district);
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

        {/* Reclaim Verification Section */}
        <div className="mt-8">
          <button
            onClick={getVerificationReq}
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 transition"
          >
            {isLoading ? 'Loading...' : 'Get Verification Request'}
          </button>

          {requestUrl && (
            <div className="flex flex-col items-center mt-4">
              <QRCode value={requestUrl} />
              <a
                href={requestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-500 underline"
              >
                Open Link
              </a>
            </div>
          )}

          {proofs && (
            <div className="mt-4 p-2 bg-green-100 rounded">
              <h2 className="text-green-700 font-semibold">Verification Successful!</h2>
              <pre className="text-xs">{JSON.stringify(proofs, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="mb-8 mt-8">
          <UserButton />
        </div>

        <button
        type="submit"
        disabled={!proofs}   // disable Submit until proofs are ready
        className={`w-full rounded-md p-2 text-white transition mt-6 ${
          proofs ? 'bg-primary hover:bg-gray-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {proofs ? 'Submit' : 'Complete Verification to Submit'}
      </button>
      </form>

      
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
  return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};
