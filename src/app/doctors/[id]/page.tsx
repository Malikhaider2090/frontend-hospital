'use client'
import Link from 'next/link';
import EditDoctor from '../../../components/doctors/form';
import { useParams } from 'next/navigation';

const EditDoctorPage = () => {

  const {id} = useParams()

  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
        Edit Doctor Details
    </h1>
    <div className="flex justify-center m-4">
      <Link href="/doctors">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Back to Doctors
        </button>
      </Link>
    </div>
    <div className="w-full flex justify-center items-center">
      <EditDoctor doctorId={id as string} />
    </div>
  </div>
</div>  
};

export default EditDoctorPage; 