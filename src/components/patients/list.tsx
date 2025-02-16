"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NoSSR from '../NoSSR'
import ConfirmationDialog from '../confirmation-dialog'

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address?: string;
  medicalHistory?: string;
  createdAt?: string;
  updatedAt?: string;
}

console.log('run')
export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getPatients = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('http://localhost:5000/api/patients')

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }

        const data = await res.json()
        setPatients(data)
      } catch (error) {
        console.error('Error fetching patients:', error)
        setError('Failed to load patients. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    getPatients()
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

  const deletePatient = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'DELETE'
      })
      setPatients(patients.filter(patient => patient.id !== id))
    } catch (error) {
      console.error('Error deleting patient:', error)
    }
  }

  const handleEdit = (patient: Patient) => {
    router.push(`/patients/${patient.id}`);
  };

  const handleDeleteClick = (id: number) => {
    setPatientToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (patientToDelete !== null) {
      await deletePatient(patientToDelete);
      setPatientToDelete(null);
      setIsDialogOpen(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <NoSSR>
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Patients List
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => router.push('/patients/add')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg
                        hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all
                        duration-200 shadow-md hover:shadow-lg"
            >
              Add Patient
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date of Birth</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-lg">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4">{patient.phoneNumber || 'No phone provided'}</td>
                  <td className="px-6 py-4">{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{patient.address || 'N/A'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600
                               rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(patient.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-500 text-red-500
                               rounded-md hover:bg-red-50 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No patients found</p>
              <p className="text-gray-400">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this patient?"
      />
    </NoSSR>
  )
}
