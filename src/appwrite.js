// src/appwrite.js
import { Client, Account, Databases, ID, Query, Permission, Role } from "appwrite";

export const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")   // region endpoint
  .setProject("68ce610700336151c2ac");               // project id

export const account = new Account(client);
export const databases = new Databases(client);

export const cfg = {
  databaseId: "68ce6bba0019e1b7678d",
  collectionId: "blogs", // must match the collection's ID in Console
};

export { ID, Query, Permission, Role };
