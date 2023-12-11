import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./_components/ui/card";
import { departments } from "~/constants";
import { buttonVariants } from "./_components/ui/button";
export function ChooseDepartment() {
  return (
    <>
      <div className="flex justify-center pb-12">
        <h1 className="text-5xl font-bold">Wybierz wydział</h1>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div
          className={`${
            departments.length > 4
              ? "justify-content-center grid grid-cols-1 justify-items-start gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              : "flex gap-12"
          }`}
        >
          {departments.map((department) => (
            <div key={department.name}>
              <Card>
                <CardHeader>
                  <CardTitle>{department.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={department.photo}
                    alt="Photo of department"
                    height={300}
                    width={300}
                    className="rounded- h-[300px] w-[300px]"
                  />
                </CardContent>
                <CardFooter>
                  <a
                    href={`/department/${department.id}`}
                    className={buttonVariants()}
                  >
                    Wybierz
                  </a>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
