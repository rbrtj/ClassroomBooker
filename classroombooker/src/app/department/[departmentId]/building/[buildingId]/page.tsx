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
    <>
      <div className="pb-12">
        <h1 className="mx-0 text-5xl font-bold">Wybierz sale</h1>
      </div>
      <ChooseRoom rooms={rooms} />
    </>
  );
}
