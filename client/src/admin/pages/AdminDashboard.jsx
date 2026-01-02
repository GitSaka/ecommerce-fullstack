import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Produits" value="120" />
        <StatCard title="Commandes" value="45" />
        <StatCard title="Utilisateurs" value="78" />
        <StatCard title="Revenus" value="350 000 FCFA" />
      </div>

      {/* Section future */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Activité récente
        </h2>
        <p className="text-gray-500">
          Tableau des dernières commandes à venir…
        </p>
      </div>
    </div>
  );
}
