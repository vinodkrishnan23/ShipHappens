"use client";

import { useEffect, useState } from "react";
  

interface Address {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface Profile {
    email: string;
    phone: string;
    address: Address;
    dob: string;
    gender: string;
    created_at: string;
    updated_at: string;
    full_name : string
}

export default function UserProfile({ user_email }: { user_email: string }) {
  const [profile, setProfile] = useState<Profile>({
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    dob: '',
    gender: '',
    created_at: '',
    updated_at: '',
    full_name: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in profile?.address) {
        setProfile((prevProfile) => ({
            ...prevProfile,
            address: {
                ...prevProfile?.address,
                [name]: value,
            },
        }));
    } else {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    }
  };

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to save changes
  const saveChanges = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          email: user_email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      console.log("Changes saved successfully");
      toggleEdit();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", { headers: { user_email: user_email } });
      const data = await res.json();
      setProfile(data.profile_info || profile);
    }
    fetchProfile();
  }, [user_email]);

  return (
    <div>
      <section className="bg-white p-6 pt-8 rounded shadow-md mx-64 mt-16">
        <button onClick={toggleEdit} className="mb-4">
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={saveChanges} className="mb-4 ml-2">
            Save
          </button>
        )}
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Full Name</span>
          {isEditing ? (
            <input
              type="text"
              name="full_name"
              value={profile?.full_name || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.full_name || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Email</span>
          <span>{profile?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Phone</span>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={profile?.phone || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.phone || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">DOB</span>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={profile?.dob || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.dob || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between border-b py-1">
          <span className="font-semibold">Gender</span>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={profile?.gender || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.gender || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold">Street</span>
          {isEditing ? (
            <input
              type="text"
              name="street"
              value={profile?.address.street || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.address.street || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold">City</span>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={profile?.address.city || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.address.city || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold">State</span>
          {isEditing ? (
            <input
              type="text"
              name="state"
              value={profile?.address.state || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.address.state || 'N/A'}</span>
          )}
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold">Zip</span>
          {isEditing ? (
            <input
              type="text"
              name="zip"
              value={profile?.address.postal_code || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{profile?.address.postal_code || 'N/A'}</span>
          )}
        </div>
      </section>
    </div>
  );
}