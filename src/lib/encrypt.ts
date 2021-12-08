// @ts-ignore: Unreachable code error
import aes256 from "aes256";

// encrypts a message
export function encryptMessage(text: string, key: string) {
  if (!key) return false;
  return aes256.encrypt(key, text);
}

// Guess what? It decrypts a message
export function decryptMessage(text: string, key: string) {
  if (!key) return "neigh";
  return aes256.decrypt(key, text);
}
