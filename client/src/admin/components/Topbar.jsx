export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button className="text-sm bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600">
        Déconnexion
      </button>
    </header>
  );
}
