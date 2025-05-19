// /utils/recordsFunctions.js

export const getRecords = async () => {
    try {
        const response = await fetch("/api/retete", {
            method: "GET",
        });
    
        const data = await response.json();
    
        if (!data?.data) {
            return [];
        }
    
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const getRecordById = async (id) => {
    try {
        const response = await fetch(`/api/retete?id=${id}`, {
            method: "GET",
        });
    
        const data = await response.json();
    
        if (!data?.data) {
            return null;
        }
    
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const createRecord = async (record) => {
    try {
        delete record._id;

        const response = await fetch("/api/retete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        });

        const data = await response.json();

        if (!data?.data) {
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateRecord = async (record) => {
    try {
        const response = await fetch("/api/retete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        });

        const data = await response.json();

        if (!data?.data) {
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteRecord = async (id) => {
    try {
        const response = await fetch(`/api/retete?id=${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!data?.data) {
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(error);
    }
}


export const postRecord = async (record) => {
  const response = await fetch('/api/retete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
  });

  return response.json();
};
