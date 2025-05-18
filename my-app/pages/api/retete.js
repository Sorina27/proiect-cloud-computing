import { ObjectId } from 'mongodb';
import { getCollection } from '@/utils/functions'; 
import { sendOk, sendMethodNotAllowed } from '@/utils/apiMethods'; 

const COLLECTION_NAME = 'retete';

const getRecords = async () => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.find({}).toArray();
};

const getRecord = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return await collection.findOne({ _id: new ObjectId(id) });
};

const postRecord = async (record) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.insertOne(record);
};

const putRecord = async (record) => {
	const collection = await getCollection(COLLECTION_NAME);
	const id = record._id;
	delete record._id;
	return collection.updateOne({ _id: new ObjectId(id) }, { $set: record });
};

const deleteRecord = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.deleteOne({ _id: new ObjectId(id) });
};

export default async function handler(req, res) {
	const { method, query, body } = req;

	if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
		return sendMethodNotAllowed(res);
	}

	try {
		if (method === 'GET') {
			if (query.id) {
				const record = await getRecord(query.id);
				return sendOk(res, record);
			} else {
				const records = await getRecords();
				return sendOk(res, records);
			}
		}

		if (method === 'POST') {
			const result = await postRecord(body);
			return sendOk(res, result);
		}

		if (method === 'PUT') {
			const result = await putRecord(body);
			return sendOk(res, result);
		}

		if (method === 'DELETE') {
			const result = await deleteRecord(query.id);
			return sendOk(res, result);
		}
	} catch (error) {
		console.error('API error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
