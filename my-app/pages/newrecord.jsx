// /pages/newrecord.jsx

import { useRouter } from "next/router";
import { useState } from "react";
import { postRecord } from "@/utils/recordsFunctions";

const NewRecipe = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    author: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const record = {
      ...formData,
      ingredients: formData.ingredients.split(",").map(ing => ing.trim()),
      createdAt: new Date()
    };

    try {
      await postRecord(record);
      router.push("/"); // Redirectează înapoi la MainPage
    } catch (error) {
      console.error("Eroare la salvare:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Adaugă o rețetă nouă
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
          Salvează rețeta
        </button>
      </form>
    </div>
  );
};

export default NewRecipe;
