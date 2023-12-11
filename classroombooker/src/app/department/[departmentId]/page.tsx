import { notFound } from "next/navigation";
import { ChooseBuilding } from "~/app/department/[departmentId]/_components/choose-building";
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
      <div className="pb-12">
        <h1 className="mx-0 text-5xl font-bold">Wybierz budynek</h1>
      </div>
      <ChooseBuilding departmentId={departmentId} />
    </>
  );
}
