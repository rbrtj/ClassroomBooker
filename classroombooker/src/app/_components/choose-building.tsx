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
        <h1 className="text-2xl font-bold">Wybierz budynek</h1>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center gap-6 md:flex-row">
        <Suspense fallback={<div>Loading ...</div>}>
          {buildings.map((building) => (
            <Link
              href={`/department/${departmentId}/building/${building.id}`}
              key={building.id}
              className={buttonVariants({ variant: "ghost" })}
            >
              {building.name}
            </Link>
          ))}
        </Suspense>
      </div>
    </>
  );
}
