'use client'
import Link from 'next/link';
import EditPatient from '../../../components/patients/form';
import { useParams } from 'next/navigation';

const EditPatientPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-teal-800 mb-8">
          Edit Patient Details
        </h1>
        <div className="flex justify-center m-4">
          <Link href="/patients">
            <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
              Back to Patients
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <EditPatient patientId={id as string} />
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;
