import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

// const categories = [
//   {
//     id: 1,
//     name: "Préservatifs",
//     slug: "preservatifs",
//     image: "https://via.placeholder.com/60",
//     is_active: 1,
//   },
//   {
//     id: 2,
//     name: "Lubrifiants",
//     slug: "lubrifiants",
//     image: "https://via.placeholder.com/60",
//     is_active: 0,
//   },
// ];

export default function CategoriesList() {
  const [categories,setCathegories] = useState([]);
  const imageBaseURL = "http://localhost:5000/uploads/categories/";

  useEffect(()=>{
    const getAllcategorie = async()=>{
      try {
          const res = await api.get("/categories") 
          setCathegories(res.data)
          console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllcategorie();
  },[])
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catégories</h1>

        <Link
          to="/admin/cathegorie/createcathegorie"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nouvelle catégorie
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Nom</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-t hover:bg-gray-50"
              >
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={imageBaseURL+cat.image}
                    alt={cat.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-medium">{cat.name}</td>

                {/* SLUG */}
                <td className="p-3 text-gray-600">{cat.slug}</td>

                {/* STATUS */}
                <td className="p-3">
                  {cat.is_active ? (
                    <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                      Désactivée
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-right space-x-2">
                  <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Modifier
                  </button>

                  <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
                    {cat.is_active ? "Désactiver" : "Activer"}
                  </button>

                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
