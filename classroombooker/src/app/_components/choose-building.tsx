import Link from "next/link";
import React, { Suspense } from "react";
import { api } from "~/trpc/server";
import { buttonVariants } from "./ui/button";

interface ChooseBuildingProps {
  departmentId: string;
}

export async function ChooseBuilding({ departmentId }: ChooseBuildingProps) {
  // As department is hard-coded and all the buildings in db are related to the department,
  // we can just get all the buildings from db and display them.
  // Later on, we can add a filter to get only the buildings related to the department.
  const buildings = await api.building.getBuildings.query();
  return (
    <>
      <div className="pb-12">
        <h1 className="text-5xl font-bold">Wybierz budynek</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Suspense fallback={<div>Loading ...</div>}>
          {buildings.map((building) => (
            <Link
              href={`/department/${departmentId}/building/${building.id}`}
              key={building.id}
            >
              <div className="transform rounded-md border p-4 transition duration-500 ease-in-out hover:scale-105">
                <h3 className="mb-2 font-semibold">Budynek {building.name}</h3>
                <p className="text-sm text-gray-500">Wydział mechaniczny</p>
              </div>
            </Link>
          ))}
        </Suspense>
      </div>
    </>
  );
}
