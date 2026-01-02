import { useState } from "react";
// import { createCategory } from "../../services/category.services";
import api from "../../services/api.js";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [formdata, setFormdata] = useState({
  name: "",
  slug: "",
  description: "",
  is_active: true,
  image: null,
});

const initialFormdata = {
  name: "",
  slug: "",
  description: "",
  is_active: 1,
  image: null,
};

const [response,setResponse] = useState("")
if (response) {
    toast.info("Ce produit est déjà dans votre panier, quantité mise à jour !");
  }
 
  const [preview, setPreview] = useState(null);
  
  const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

  function handleNameChange(e) {
    const value = e.target.value;
    setFormdata({
      ...formdata,
      [e.target.name]: generateSlug(value),
    });

  }


  // Handle input text
  const handleChange = (e) => {
     const {value} = e.target;
    setFormdata({
      ...formdata,
      [e.target.name]: value,
    });
  };

  // Handle image upload (Facebook-like)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormdata({
      ...formdata,
      image:file
    });

    setPreview(URL.createObjectURL(file));
  };
  console.log(formdata)

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newCategory = {
    name: formdata.name,
    slug: formdata.slug,
    description: formdata.description,
    is_active: formdata.is_active,
  };

  if (formdata.image) {
    const data = new FormData();
    const fileName = Date.now() + "_" + formdata.image?.name;

    data.append("file", formdata.image);
    data.append("name", fileName);

    newCategory.image = fileName;

    try {
      await api.post(
        "/categories/upload?name=" + fileName,
        data
      );
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const res = await api.post("/categories", newCategory);
    
    setResponse(res.data.message)
   
   setFormdata(initialFormdata);
   setPreview(null);
  } catch (err) {
    console.log(err);
  }
};

  


 

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">
        Créer une catégorie
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>{response}</div>
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nom de la catégorie
          </label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            name="slug"
            value={formdata.slug}
            onChange={handleNameChange}
            placeholder="ex: preservatifs"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* IMAGE UPLOAD – FACEBOOK STYLE */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Image catégorie
          </label>

          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-500">
                Cliquez pour ajouter une image
              </span>
            )}
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* STATUS */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formdata.is_active}
            onChange={() =>
              setFormdata({
                ...formdata,
                is_active: !formdata.is_active,
              })
            }
          />
          <span>Catégorie active</span>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Créer la catégorie
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
