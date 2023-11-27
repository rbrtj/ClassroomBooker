import { type Rooms } from "~/lib/types/room";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronRight } from "lucide-react";

// TODO: Find a better way to get a room type.
export function ChooseRoom({ rooms }: { rooms: Rooms }) {
  return (
    <div className="container h-3/4">
      <ScrollArea className="h-3/4 w-full overflow-y-auto pr-4">
        {rooms.map((room) => (
          <Link key={room.id} href={"/"}>
            <Card className="mb-4 flex items-center justify-between bg-white transition-colors duration-300 ease-in-out hover:bg-gray-200">
              <CardHeader>
                <CardTitle>Sala {room.name}</CardTitle>
              </CardHeader>
              <ChevronRight size={32} className="mr-12" />
            </Card>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
