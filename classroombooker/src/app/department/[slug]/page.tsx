import { notFound } from "next/navigation";
import { ChooseBuilding } from "~/app/_components/choose-building";
import { departments } from "~/constants";

interface PageProps {
  params: {
    slug: string;
  };
}
export default function Home({ params }: PageProps) {
  const { slug } = params;
  if (!departments.find((department) => department.id.toString() === slug))
    return notFound();
  return (
    <>
      <ChooseBuilding departmentId={slug} />
    </>
  );
}
