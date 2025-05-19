// /pages/editrecord.jsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRecordById, updateRecord } from "@/utils/recordsFunctions";

const EditRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    author: ""
  });

  // Încarcă rețeta existentă
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const data = await getRecordById(id);
        if (data) {
          setFormData({
            ...data,
            ingredients: data.ingredients?.join(", ") || ""
          });
        }
      } catch (error) {
        console.error("Eroare la încărcarea rețetei:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecord = {
      ...formData,
      _id: id,
      ingredients: formData.ingredients.split(",").map((i) => i.trim())
    };

    try {
      await updateRecord(updatedRecord);
      router.push("/"); // Redirectează la pagina principală
    } catch (error) {
      console.error("Eroare la actualizare:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Editează rețeta
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titlul rețetei"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Autorul"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <textarea
          name="ingredients"
          placeholder="Ingrediente separate prin virgulă"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows={3}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instrucțiuni de preparare"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows={5}
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
        >
          Salvează modificările
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
