import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { ChevronRight } from "lucide-react";

interface ChooseBuildingProps {
  departmentId: string;
}

export async function ChooseBuilding({ departmentId }: ChooseBuildingProps) {
  // As department is hard-coded and all the buildings in db are related to the department,
  // we can just get all the buildings from db and display them.
  // Later on, we can add a filter to get only the buildings related to the department.
  const buildings = await api.building.getBuildings.query();
  return (
    <div className="container h-3/4">
      <ScrollArea className="h-3/4 w-full overflow-y-auto pr-4">
        {buildings.map((building) => (
          <Link
            key={building.id}
            href={`/department/${departmentId}/building/${building.id}`}
          >
            <Card
              key={building.id}
              className="mb-4 flex items-center justify-between bg-white transition-colors duration-300 ease-in-out hover:bg-gray-200"
            >
              <CardHeader>
                <CardTitle>Budynek {building.name}</CardTitle>
                <CardDescription>Wydział mechaniczny</CardDescription>
              </CardHeader>
              <ChevronRight size={32} className="mr-12" />
            </Card>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
