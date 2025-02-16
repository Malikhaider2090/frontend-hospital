
import PatientsList from "@/components/patients/list";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Patient Management System',
  description: 'A modern system to manage Patients',
  icons: {
    icon: '/icon.png',
  },
}

export default function Patients() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Pateints Management System
        </h1>
        <div className="grid grid-cols-1 gap-8">
          <PatientsList />
        </div>
      </div>
    </div>
  );
}