"use client";
import { RoomAgenda } from "~/components/RoomAgenda";
import { api } from "~/trpc/react";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default function Home({ params }: PageProps) {
  const { roomId } = params;
  // TODO: Add error handling for invalid roomId (e.g. string)
  const { data: agenda, refetch } = api.lectures.getLectures.useQuery({
    roomId: parseInt(roomId),
  });

  // Used to omit refetch type
  const refetchWrapper = async () => {
    await refetch();
  };

  if (!agenda) return null;

  return <RoomAgenda agenda={agenda} refetchLectures={refetchWrapper} />;
}
