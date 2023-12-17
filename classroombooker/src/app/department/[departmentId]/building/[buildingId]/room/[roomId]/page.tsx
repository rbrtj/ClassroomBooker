"use client";
import { useState } from "react";
import { RoomAgenda } from "~/components/RoomAgenda";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default function Home({ params }: PageProps) {
  const [isOddWeekSelected, setIsOddWeekSelected] = useState<boolean>(true);
  const { roomId } = params;
  // TODO: Add error handling for invalid roomId (e.g. string)
  const { data: agenda, refetch } = api.lectures.getLectures.useQuery({
    roomId: parseInt(roomId),
  });

  // Used to omit refetch type
  const refetchWrapper = async () => {
    await refetch();
  };

  const handleWeekParityChange = () => {
    setIsOddWeekSelected(!isOddWeekSelected);
  };

  if (!agenda) return null;

  const filteredAgenda = agenda.filter(
    (lecture) => lecture.evenWeek === !isOddWeekSelected,
  );

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mt-24 flex gap-4 md:mt-0">
        <Button
          variant={isOddWeekSelected ? "default" : "outline"}
          onClick={handleWeekParityChange}
        >
          Tydzień nieparzysty
        </Button>
        <Button
          variant={isOddWeekSelected ? "outline" : "default"}
          onClick={handleWeekParityChange}
        >
          Tydzień parzysty
        </Button>
      </div>
      <RoomAgenda agenda={filteredAgenda} refetchLectures={refetchWrapper} />
    </div>
  );
}
