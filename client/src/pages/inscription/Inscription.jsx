export default function Inscription() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Inscription Admin</h1>
        <p className="text-center text-gray-500 mb-6">Créer un compte administrateur</p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Adresse email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-[#ff7b95] cursor-pointer text-blue py-2 rounded-lg hover:bg-[#ffe4ec] transition"
          >
            Créer le compte
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Déjà un compte ? <span className="text-blue-600 cursor-pointer">Se connecter</span>
        </p>
      </div>
    </div>
  );
}
