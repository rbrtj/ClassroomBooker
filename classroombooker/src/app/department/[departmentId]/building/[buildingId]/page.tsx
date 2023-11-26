import { ChooseRoom } from "~/app/_components/choose-room";
import { api } from "~/trpc/server";

export default async function Home({
  params,
}: {
  params: { buildingId: string };
}) {
  const { buildingId } = params;
  // TODO: Handle invalid buildingId
  const rooms = await api.rooms.getRoomsForBuilding.query({
    buildingId: parseInt(buildingId),
  });
  console.log("Rooms: ", rooms);
  return (
    <div>
      <ChooseRoom rooms={rooms} />
    </div>
  );
}
