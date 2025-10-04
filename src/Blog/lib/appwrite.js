// src/lib/appwrite.js
import { Client, Account, Databases, ID, Permission, Role } from 'appwrite';

export const APPWRITE_ENDPOINT = 'https://nyc.cloud.appwrite.io/v1'; 
export const APPWRITE_PROJECT_ID = '68d864f4000911aa1c06'; 
export const DB_ID = '68d8659b002cc23f50ff'; 
export const COLLECTION_ID = 'myblogs'; 
export const ADMIN_USER_ID = '68d86bef002cec462635'; 

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Permission, Role };
