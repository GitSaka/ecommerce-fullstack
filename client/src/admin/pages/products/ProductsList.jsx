// import { useState } from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ProductsList = () => {
    // const [active,setActive] = useState(true);
    const [products,setProducts] = useState([]);
  // 🔹 Données mock (temporaire)
 
   useEffect(()=>{
       const getAllProduct = async()=>{
        try {
          const res = await api.get("/products")
          setProducts(res.data);
        } catch (error) {
          console.log(error)
        }
       }
       getAllProduct();
   },[])

   const imageBaseURL = "http://localhost:5000/uploads/product/";
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Produits
        </h1>

        <Link to={'/admin/product/createproduct'} className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition">
          + Ajouter un produit
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Prix</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={imageBaseURL + product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.price.toLocaleString()} FCFA
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      product.is_active === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.is_active === 1
                      ? "Actif"
                      : "Inactif"}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Modifier
                  </button>
                  <button
                        className={
                        product.status == "active"
                            ? "text-yellow-600 hover:underline"
                            : "text-green-600 hover:underline"
                        }
                        // onClick={() => toggleProductStatus(product.id)}
                    >
                        {product.status ? "Désactiver" : "Activer"}
                    </button>
                  <button className="text-red-600 hover:underline">
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
};

export default ProductsList;
