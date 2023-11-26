import { type Rooms } from "~/lib/types/room";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

// TODO: Find a better way to get a room type.
export function ChooseRoom({ rooms }: { rooms: Rooms }) {
  return (
    <>
      <div className="flex justify-center pb-12">
        <h1 className="text-5xl font-bold">Wybierz sale</h1>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div
          className={`${
            rooms.length > 4
              ? "justify-content-center grid grid-cols-1 justify-items-start gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              : "flex gap-12"
          }`}
        >
          {rooms.map((room) => (
            <Link href="/" key={room.id}>
              <Card className="hover:bg-secondary/90">
                <CardHeader>
                  <CardTitle>Sala {room.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
