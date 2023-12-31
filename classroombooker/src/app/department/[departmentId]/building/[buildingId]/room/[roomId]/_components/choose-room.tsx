import { type Rooms } from "~/lib/types/room";
import {
  Card,
  CardHeader,
  CardTitle,
} from "../../../../../../../../components/ui/card";
import Link from "next/link";
import { ScrollArea } from "../../../../../../../../components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface ChooseRoomProps {
  rooms: Rooms;
  buildingId: string;
  departmentId: string;
}

// TODO: Find a better way to get a room type.
export function ChooseRoom({
  rooms,
  buildingId,
  departmentId,
}: ChooseRoomProps) {
  return (
    <div className="container h-3/4">
      <ScrollArea className="h-3/4 w-full overflow-y-auto pr-4">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/department/${departmentId}/building/${buildingId}/room/${room.id}`}
          >
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
