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
  { id: 7, name: "Cardiology" },
  { id: 8, name: "Dentist" },
  { id: 9, name: "Dermatology" },
  { id: 10, name: "ENT" },
  { id: 11, name: "Orthopaedic" },
  { id: 12, name: "Pediatrics" },
];

export const DoctorForm = ({ doctorId }: { doctorId?: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Doctor>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    categoryId: categories[0].id,
  });

  const [loading, setLoading] = useState(false);

  // Fetch doctor details if doctorId exists (for editing)
  useEffect(() => {
    if (doctorId) {
      const fetchDoctor = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
          if (!response.ok) {
            console.error("Error fetching doctor:", await response.text());
            throw new Error("Failed to fetch doctor");
          }
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Error fetching doctor:", error);
        }
      };

      fetchDoctor();
    }
  }, [doctorId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value, // Convert categoryId to number
    }));
  };

  // Handle form submission (Create)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate categoryId
      if (!categories.some(category => category.id === formData.categoryId)) {
        throw new Error("Invalid category selected.");
      }

      const url = "http://localhost:5000/api/doctors"; // URL for creating a new doctor
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create doctor");
      }

      router.push("/"); // Redirect after successful creation
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert(error instanceof Error ? error.message : "Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/6 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white text-center mb-4">{doctorId ? "Edit Doctor" : "Add Doctor"}</h2>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {doctorId ? "Update Doctor" : "Create Doctor"}
      </button>
    </form>
  );
};

export default DoctorForm;
