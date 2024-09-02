'use server';

import { Client, Account } from 'node-appwrite';
import { APPWRITE_KEY } from '$env/static/private';
import {
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT,
} from '$env/static/public';

export const SESSION_COOKIE = 'appwrite-session';

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY); // Set the Appwrite API key!

  // Return the services we want to use.
  return {
    get account() {
      return new Account(client);
    },
  };
}

export function createSessionClient(event) {
  const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT);

  // Extract our custom domain's session cookie from the request
  const session = event.cookies.get(SESSION_COOKIE);
  if (!session) {
    throw new Error('No user session');
  }

  client.setSession(session);

  // Return the services we want to use.
  return {
    get account() {
      return new Account(client);
    },
  };
}
