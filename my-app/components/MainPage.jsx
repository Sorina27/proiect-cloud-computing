import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteRecord, getRecords } from "@/utils/recordsFunctions";

const MainPage = () => {
  const router = useRouter();
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await getRecords();
      setRecords(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await deleteRecord(id);
      if (response.deletedCount === 1) {
        const newRecords = records.filter((record) => record._id !== id);
        setRecords(newRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRecord = (id) => {
    router.push(`/editrecord?id=${id}`);
  };

  const handleCreateRecord = () => {
    router.push("/newrecord");
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1
        className="text-4xl md:text-5xl font-semibold text-center text-green-800 mb-10 max-w-4xl mx-auto leading-snug"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Inspiră și fii inspirat – descoperă rețete gustoase și adaugă-ți propria idee pentru a ajuta și pe alții!
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleCreateRecord}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium shadow-sm"
        >
          + Adaugă rețetă nouă
        </button>
      </div>

      <div className="flex flex-col items-center gap-5">
        {records.map((record) => (
          <div
            key={record._id}
            className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-5 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {record.title}
            </h2>

            <p className="text-xs text-gray-500 mb-1">
              <strong>Autor:</strong> {record.author || "Necunoscut"} |{" "}
              {record.createdAt ? new Date(record.createdAt).toLocaleString() : "N/A"}
            </p>

            <p className="text-sm text-gray-700 mb-1">
              <strong>Ingrediente:</strong> {record.ingredients?.join(", ")}
            </p>

            <p className="text-sm text-gray-700 mb-4">
              <strong>Instrucțiuni:</strong> {record.instructions}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUpdateRecord(record._id)}
                className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs"
              >
                Editează
              </button>
              <button
                onClick={() => handleDeleteRecord(record._id)}
                className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md text-xs"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
