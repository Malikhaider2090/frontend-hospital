import DoctorForm from "@/components/doctors/doctor-form";

interface PageProps {
  params: {
    id: string;
  };
}

export default function UpdateDoctorPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4">
      <DoctorForm doctorId={params.id} />
    </div>
  );
}