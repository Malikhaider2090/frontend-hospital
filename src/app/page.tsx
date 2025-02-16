import Link from 'next/link'; // Import Link for navigation
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Doctor Management System',
  description: 'A modern system to manage medical professionals',
  icons: {
    icon: '/icon.png', // Ensure this path is correct
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Doctor Management System
        </h1>
        <div className="text-center mb-8 flex justify-center gap-4">
          <Link 
            href="/doctors"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
          >
            View Doctors
          </Link>
          <Link 
            href="/patients"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
          >
            View Patients
          </Link>
        </div>
      </div>
    </div>
  );
}
