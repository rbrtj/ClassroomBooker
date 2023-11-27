import { RoomAgenda } from "~/app/_components/room-agenda";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default async function Home({ params }: PageProps) {
  const { roomId } = params;
  // TODO: Add error handling for invalid roomId (e.g. string)
  const agenda = await api.agenda.getAgenda.query({ roomId: parseInt(roomId) });
  return <RoomAgenda agenda={agenda} />;
}
