import {Client, Databases} from 'appwrite'

export const PROJECT_ID = '667921480027214e6e76';
export const DATABASE_ID = '66792243003a89828853';
export const COLLECTION_ID_MESSAGES = '6679224b0026711fb192';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('667921480027214e6e76');

export const databases = new Databases(client);
export default client;