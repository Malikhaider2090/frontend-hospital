import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DoctorForm } from '@/components/doctors/doctor-form';

export default function UpdateDoctor() {
  const router = useRouter();
  const { id } = router.query;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDoctor = async () => {
        try {
          const response = await fetch(`/api/doctors/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch doctor');
          }
          const data = await response.json();
          setDoctor(data);
        } catch (error) {
          console.error('Error fetching doctor:', error);
          // Optionally set an error state to display to the user
        }
      };

      fetchDoctor();
    }
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Doctor</h1>
      <DoctorForm doctor={doctor} />
    </div>
  );
} 