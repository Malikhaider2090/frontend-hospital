"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
}

export const PatientForm = ({ patientId }: { patientId?: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Patient>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch patient details if patientId exists (for editing)
  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/patients/${patientId}`);
          if (!response.ok) {
            console.error("Error fetching patient:", await response.text());
            throw new Error("Failed to fetch patient data");
          }
          const data = await response.json();
          
          // Ensure the dateOfBirth is in the correct format
          const formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth.split('T')[0], // Assuming dateOfBirth is in ISO format
          };

          setFormData(formattedData);
        } catch (error) {
          console.error("Error fetching patient:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPatient();
    }
  }, [patientId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      let url;

      if (patientId) {
        console.log("Update Patient", formData);
        url = `http://localhost:5000/api/patients/${patientId}`;
        const { id, ...updateData } = formData;
        response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });
      } else {
        console.log("Create Patient");
        url = "http://localhost:5000/api/patients";
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed");
      }

      router.push("/patients"); // Redirect after successful creation
    } catch (error) {
      console.error("Error saving patient:", error);
      alert(error instanceof Error ? error.message : "Failed to save patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/6 p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white text-center mb-4">{patientId ? "Edit Patient" : "Add Patient"}</h2>
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
  <label className="block text-white text-sm font-bold mb-2">Date of Birth</label>
  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth} // This should be in YYYY-MM-DD format
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    required
  />
</div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-white hover:bg-gray-200 text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? "Saving..." : patientId ? "Update Patient" : "Create Patient"}
      </button>
    </form>
  );
};

export default PatientForm;
