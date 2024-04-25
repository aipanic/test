// Key derivation function using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

// Encrypt private key using AES-GCM
async function encryptPrivateKey(privateKey: string, password: string): Promise<EncryptedKey> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoder.encode(privateKey)
  );
  return {
    encrypted: Array.from(new Uint8Array(encrypted)),
    iv: Array.from(iv),
    salt: Array.from(salt)
  };
}

// Decrypt private key using AES-GCM
async function decryptPrivateKey(encryptedKey: EncryptedKey, password: string): Promise<string> {
  const key = await deriveKey(password, new Uint8Array(encryptedKey.salt));
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encryptedKey.iv) },
    key,
    new Uint8Array(encryptedKey.encrypted)
  );
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Store encrypted private key in localStorage
async function storePrivateKey(): Promise<void> {
  const privateKeyInput = document.getElementById('privateKeyInput') as HTMLInputElement;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
  const privateKey = privateKeyInput.value;
  const password = passwordInput.value;
  const encryptedKey = await encryptPrivateKey(privateKey, password);
  localStorage.setItem('encryptedPrivateKey', JSON.stringify(encryptedKey));
  alert('Private key stored successfully!');
}

// Retrieve and decrypt private key from localStorage
async function getPrivateKey(password: string): Promise<string | null> {
  const encryptedKeyJson = localStorage.getItem('encryptedPrivateKey');
  if (encryptedKeyJson) {
    const encryptedKey: EncryptedKey = JSON.parse(encryptedKeyJson);
    try {
      const privateKey = await decryptPrivateKey(encryptedKey, password);
      return privateKey;
    } catch (error) {
      console.error('Error decrypting private key:', error);
      alert('Invalid password. Please try again.');
      return null;
    }
  }
  return null;
}

// Handle form submission
async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
  const password = passwordInput.value;
  const privateKey = await getPrivateKey(password);
  if (privateKey) {
    console.log('Private key:', privateKey);
    // Perform swap functionality here
    alert('Swap initiated successfully!');
  }
}

// Attach event listener to the form
document.addEventListener('DOMContentLoaded', () => {
  const keyForm = document.getElementById('keyForm') as HTMLFormElement;
  keyForm.addEventListener('submit', handleSubmit);
});

// Interface for the encrypted key object
interface EncryptedKey {
  encrypted: number[];
  iv: number[];
  salt: number[];
}
