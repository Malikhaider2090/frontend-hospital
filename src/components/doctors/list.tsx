"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NoSSR from '../NoSSR'
import ConfirmationDialog from '../confirmation-dialog'

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  categoryId: number;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [doctorToDelete, setDoctorToDelete] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('http://localhost:5000/api/doctors')
        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        
        const data = await res.json()
        setDoctors(data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
        setError('Failed to load doctors. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    getDoctors()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  const deleteDoctor = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: 'DELETE'
      })
      setDoctors(doctors.filter(doctor => doctor.id !== id))
    } catch (error) {
      console.error('Error deleting doctor:', error)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return (firstName[0] || '') + (lastName[0] || '');
  }

  const filteredDoctors = doctors.filter(doctor => 
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    7: "CARDIOLOGY",
    8: "DENTIST",
    9: "DERMATOLOGY",
    10: "ENT",
    11: "ORTHOPAEDIC",
    12: "PEDIATRICS"
  };

  const getCategoryName = (categoryId: number) => {
    return categories[categoryId as keyof typeof categories] || 'General';
  };

  const handleEdit = (doctor: Doctor) => {
    router.push(`/doctors/${doctor.id}`);
  };

  const updateDoctor = async (id: number, updatedData: Partial<Doctor>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setDoctors(doctors.map(doctor => (doctor.id === id ? data : doctor)));
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDoctorToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (doctorToDelete !== null) {
      await deleteDoctor(doctorToDelete);
      setDoctorToDelete(null);
      setIsDialogOpen(false);
    }
  };

  return (
    <NoSSR>
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Medical Team
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button 
              onClick={() => router.push('/doctors/add')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg
                        hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all
                        duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Doctor
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specialty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredDoctors.map((doctor) => (
                <tr 
                  key={doctor.id}
                  className="hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-semibold">
                          {doctor.firstName[0]}{doctor.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900 text-lg">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                     bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                      {getCategoryName(doctor.categoryId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {doctor.phoneNumber || 'No phone provided'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600
                               rounded-md hover:bg-blue-50 transition-colors duration-200 gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doctor.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-500 text-red-500
                               rounded-md hover:bg-red-50 transition-colors duration-200 gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No doctors found</p>
              <p className="text-gray-400">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this doctor?"
      />
    </NoSSR>
  )
}