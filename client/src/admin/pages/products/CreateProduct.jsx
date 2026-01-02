import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CreateProduct() {
const [preview, setPreview] = useState(null);
const [cathegorie,setCathegorie] = useState([]);


  const [form, setForm] = useState({
    name: "",
    category_id: "",
    price: "",
    sale_price:"",
    stock: "",
    slug:"",
    description: "",
    short_description:"",
    image: "",
    is_active: true,
  });

  const initialFormdata = {
  name: "",
    category_id: "",
    price: "",
    sale_price:"",
    stock: "",
    slug:"",
    description: "",
    short_description:"",
    image: "",
    is_active: null,
};

    const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // enlève accents
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };



  const handleChange = (e) => {
    const { name, value} = e.target;
    setForm({
      ...form,
      [name]: name === "slug" ? generateSlug(value) : value,
    });
  };
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setForm({ ...form, image: file });
  setPreview(URL.createObjectURL(file));
};

 console.log(form)


  const handleSubmit = async(e) => {
    e.preventDefault();
    const newProduct = {
      name: form.name,
      category_id: form.category_id,
      price: form.price,
      stock: form.stock,
      slug:form.slug,
      description:form.description,
      is_active: form.is_active,
    }

    if(form.image){
       const data = new FormData();
       const fileName = Date.now() + "_" + form.image?.name;

      data.append("file", form.image);
      data.append("name", fileName);

      newProduct.image = fileName
       try {
      await api.post(
        "/products/upload?name=" + fileName,
        data
      );
    } catch (error) {
      console.log(error);
    }

    }

    try {
      const res = await api.post("/products",newProduct);
      console.log(res.data)
      setForm(initialFormdata);
      setPreview(null);
    } catch (error) {
     console.log(error) 
    }


  };



    useEffect(()=>{
        const getAllcategorieId = async()=>{
          try {
              const res = await api.get("/categories") 
              setCathegorie(res.data)
              console.log(res.data)
          } catch (error) {
            console.log(error)
          }
        }
        getAllcategorieId();
    },[])

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Créer un produit</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium mb-1">Nom du produit</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Sélectionner</option>
            {/* dynamique plus tard */}
            {cathegorie.map((c)=>(
                <option key={c.id} value={c.id}
                >{c.name}</option>
            ))}
          </select>
        </div>

        {/* Prix */}
        <div>
          <label className="block text-sm font-medium mb-1">Prix</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
         <div>
          <label className="block text-sm font-medium mb-1">Prix de vente</label>
          <input
            type="number"
            step="0.01"
            name="sale_price"
            value={form.sale_price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

                {/* Image */}
                
        <div>
        <label className="block text-sm font-medium mb-2">
            Image du produit
        </label>

        <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
        />

        <label
            htmlFor="image"
            className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
            {preview ? (
            <img
                src={preview}
                alt="preview"
                className="h-full object-contain rounded-lg"
            />
            ) : (
            <div className="text-center text-gray-500">
                <p className="text-sm">Cliquez pour ajouter une image</p>
                <p className="text-xs">PNG, JPG, JPEG</p>
            </div>
            )}
        </label>
        </div>


        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description courte</label>
          <textarea
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description long</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Actif */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={()=>setForm(
             { ...form,
              is_active: !form.is_active}
            )}
          />
          <span>Produit actif</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
}
