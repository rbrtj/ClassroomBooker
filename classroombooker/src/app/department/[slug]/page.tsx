import { notFound } from "next/navigation";
import { departments } from "~/constants";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    slug: string;
  };
}
export default async function Home({ params }: PageProps) {
  const { slug } = params;
  if (!departments.find((department) => department.id.toString() === slug))
    return notFound();
  const scheduleData = await api.schedule.get.query();
  console.log(scheduleData);
  return <>{scheduleData.map((data) => data.room)}</>;
}
