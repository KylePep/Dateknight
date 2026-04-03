export default function lobbyPage() {
  return (
    <ul className="flex flex-col gap-4">
      <li>Users are shown a list of their accepted friends</li>
      <li>They can select a friend to send a connection request to</li>
      <li>The other user must then accept the connection request</li>
      <li>Once the connection request is accepted a room is created where each user has the ability to select/create dates to compare</li>
    </ul>
  );
}