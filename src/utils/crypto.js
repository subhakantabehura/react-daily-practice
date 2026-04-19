import CryptoJS from 'crypto-js';

// Logic: Use the provided sKey for AES encryption/decryption
const sKey = 'a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=';

/**
 * getDecodedKey
 * Helper to decode the Base64 security key
 */
const getDecodedKey = () => {
  return CryptoJS.enc.Base64.parse(sKey);
};

/**
 * Encrypt Utility
 * Uses AES-CBC with a random IV as per advanced NSDL requirements.
 * Wraps payload as { RequestData: "encrypted_string" }
 */
export const encryptPayload = (requestBody) => {
  if (!requestBody) return requestBody;

  const serializedBody =
    typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody ?? {})
  
  const iv = CryptoJS.lib.WordArray.random(16)
  const decodedKey = getDecodedKey()
  
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(serializedBody), decodedKey, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  })
  
  const combined = iv.concat(encrypted.ciphertext)
  const encryptedString = CryptoJS.enc.Base64.stringify(combined)
  
  // Logic: The API expects the payload wrapped in RequestData
  return { RequestData: encryptedString };
};

/**
 * Decrypt Utility
 * Handles encrypted responses from NSDL APIs
 */
export const decryptResponse = (encryptedData) => {
  if (!encryptedData || typeof encryptedData !== 'string') {
    return encryptedData;
  }

  try {
    const byteCipherText = CryptoJS.enc.Base64.parse(encryptedData)
    
    // Extract IV (first 16 bytes / 4 words)
    const iv = CryptoJS.lib.WordArray.create(byteCipherText.words.slice(0, 4), 16)
    
    // Extract CipherText (remaining bytes)
    const cipherText = CryptoJS.lib.WordArray.create(
      byteCipherText.words.slice(4),
      byteCipherText.sigBytes - 16,
    )
    
    const decodedKey = getDecodedKey()
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, decodedKey, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })
    
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Decryption failed:", error);
    return encryptedData;
  }
};
