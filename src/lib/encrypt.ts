// @ts-ignore: Unreachable code error
import aes256 from "aes256";
import { useAuthContext } from "../auth/useAuth";

export function encryptMessage(text: string, key: string) {
  if (!key) return false;
  return aes256.encrypt(key, text);
}

export function decryptMessage(text: string, key: string) {
  if (!key) return "neigh";
  return aes256.decrypt(key, text);
}

export function useEncryption() {
  const { key } = useAuthContext();
  function encrypt(text: string) {
    return encryptMessage(text, key);
  }
  function decrypt(text: string) {
    return decryptMessage(text, key);
  }

  return { encryptMessage: encrypt, decryptMessage: decrypt };
}
