import { DoctorForm } from "@/components/doctors/doctor-form";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditDoctorPage({ params }: PageProps) {
  // Validate the ID exists
  const doctorId = params.id;

  return (
    <div className="container mx-auto px-4">
      <DoctorForm doctorId={doctorId} />
    </div>
  );
}