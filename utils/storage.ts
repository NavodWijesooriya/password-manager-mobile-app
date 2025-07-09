import * as SecureStore from 'expo-secure-store';

export async function savePassword(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getPassword(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function deletePassword(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
  createdAt: string;
}

export async function savePasswordEntry(entry: PasswordEntry) {
  const existingPasswords = await getAllPasswords();
  const updatedPasswords = [...existingPasswords, entry];
  await SecureStore.setItemAsync('passwords', JSON.stringify(updatedPasswords));
}

export async function getAllPasswords(): Promise<PasswordEntry[]> {
  const passwords = await SecureStore.getItemAsync('passwords');
  return passwords ? JSON.parse(passwords) : [];
}

export async function deletePasswordEntry(id: string) {
  const existingPasswords = await getAllPasswords();
  const updatedPasswords = existingPasswords.filter(p => p.id !== id);
  await SecureStore.setItemAsync('passwords', JSON.stringify(updatedPasswords));
}

export async function saveMasterPassword(password: string) {
  await SecureStore.setItemAsync('masterPassword', password);
}

export async function getMasterPassword(): Promise<string | null> {
  return await SecureStore.getItemAsync('masterPassword');
}

export async function checkMasterPassword(password: string): Promise<boolean> {
  const stored = await getMasterPassword();
  return stored === password;
}
