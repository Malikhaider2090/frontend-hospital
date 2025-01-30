"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Doctor {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  categoryId: number;
  bio: string;
}

const categories = [
  { id: 1, name: "General" },
  { id: 2, name: "Cardiology" },
  { id: 3, name: "Dentist" },
  { id: 4, name: "Dermatology" },
  { id: 5, name: "ENT" },
  { id: 6, name: "Orthopaedic" },
  { id: 7, name: "Pediatrics" },
];

interface DoctorFormProps {
  doctorId?: string;
}

import React from 'react';

interface DoctorFormProps {
  doctor?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    categoryId: number;
    bio?: string;
  };
}

export const DoctorForm: React.FC<DoctorFormProps> = ({ doctor }) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const [formData, setFormData] = useState<Doctor>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    categoryId: categories[0].id,
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      categoryId: formData.categoryId,
      bio: formData.bio,
    };

    try {
      const response = await fetch(`${API_URL}/api/doctors/${doctor?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }

      const updatedDoctor = await response.json();
      console.log('Doctor updated successfully:', updatedDoctor);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert(error instanceof Error ? error.message : 'Failed to update doctor');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-8">
      <form
        onSubmit={handleSubmit}
        className="w-[600px] space-y-4 bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-3xl shadow-2xl"
        suppressHydrationWarning
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white" suppressHydrationWarning>
            {doctor ? "Update Doctor" : "Create Doctor"}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white text-base font-semibold block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60"
                required
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="text-white text-base font-semibold block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60"
                required
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white text-base font-semibold block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60"
                required
                placeholder="doctor@example.com"
              />
            </div>
            <div>
              <label className="text-white text-base font-semibold block mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60"
                required
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-base font-semibold block mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60"
              required
              placeholder="Enter doctor's bio"
              rows={4}
            />
          </div>
          <div>
            <label className="text-white text-base font-semibold block mb-2">Specialty</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-gray-900">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-blue-600 bg-white hover:bg-blue-50"
            suppressHydrationWarning
          >
            {doctor ? "Update Doctor" : "Create Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};
