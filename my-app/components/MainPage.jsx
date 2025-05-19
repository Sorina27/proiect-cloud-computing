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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700">
        Inspiră și fii inspirat – descoperă rețete gustoase și adaugă-ți propria idee pentru a ajuta și pe alții!
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleCreateRecord}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-md font-semibold"
        >
          Adaugă o rețetă nouă
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {records.map((record) => (
          <div
            key={record._id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {record.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              <strong>Autor:</strong> {record.author || "Necunoscut"} |{" "}
              {record.createdAt ? new Date(record.createdAt).toLocaleString() : "N/A"}
            </p>

            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Ingrediente:</strong> {record.ingredients?.join(", ")}
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              <strong>Instrucțiuni:</strong> {record.instructions}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleUpdateRecord(record._id)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteRecord(record._id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
