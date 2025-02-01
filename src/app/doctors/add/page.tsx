import DoctorForm from "@/components/doctors/form";
import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Doctor Management System',
  description: 'A modern system to manage medical professionals',
  icons: {
    icon: '/icon.png',
  },
}

export default function Doctors() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Add Doctor Details
        </h1>
        <div className="flex justify-center m-4">
          <Link href="/doctors">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Back to Doctors
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <DoctorForm />
        </div>
      </div>
    </div>
  );
}
