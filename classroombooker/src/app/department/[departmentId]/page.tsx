import { notFound } from "next/navigation";
import { ChooseBuilding } from "~/app/_components/choose-building";
import { departments } from "~/constants";

interface PageProps {
  params: {
    departmentId: string;
  };
}
export default function Home({ params }: PageProps) {
  const { departmentId } = params;
  if (
    !departments.find((department) => department.id.toString() === departmentId)
  )
    return notFound();
  return (
    <>
      <ChooseBuilding departmentId={departmentId} />
    </>
  );
}
