import DoctorForm from "@/components/doctors/form";
import DoctorsList from "@/components/doctors/list";
// import EditDoctor from "@/components/doctors/EditDoctor";
import { Metadata } from "next";

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
          Doctor Management System
        </h1>
        <div className="grid grid-cols-1 gap-8">
          <DoctorsList />
        </div>
      </div>
    </div>
  );
}
