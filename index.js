/**
 * @file index.js
 * @description Encrypts and decrypts wallet words using a safeword.
*/

const crypto = require('crypto');
const readline = require('readline');

// Configuration for encryption
const algorithm = 'aes-256-cbc'; // encryption algorithm
const keyLength = 32;            // key length for AES-256
const ivLength = 16;             // AES block size (16 bytes)
const iterations = 100000;       // number of iterations for key derivation

/**
 * Encrypts the given text using a safeword.
 *
 * @param {string} text - The wallet words (or any text) to encrypt.
 * @param {string} safeword - The passphrase used to derive the encryption key.
 * @returns {object} - An object containing the salt, iv, and encrypted data (all in hex format).
 */
function encrypt(text, safeword) {
  // Generate a random salt and IV.
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(ivLength);

  // Derive a key from the safeword and salt using PBKDF2.
  const key = crypto.pbkdf2Sync(safeword, salt, iterations, keyLength, 'sha256');

  // Create a cipher using the derived key and IV.
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return an object containing all values needed for decryption.
  return {
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    data: encrypted
  };
}

/**
 * Decrypts the encrypted object using the provided safeword.
 *
 * @param {object} encrypted - The object containing salt, iv, and encrypted data.
 * @param {string} safeword - The safeword used during encryption.
 * @returns {string} - The decrypted text.
 */
function decrypt(encrypted, safeword) {
  // Convert the hex strings back to buffers.
  const salt = Buffer.from(encrypted.salt, 'hex');
  const iv = Buffer.from(encrypted.iv, 'hex');

  // Derive the key using the same parameters as during encryption.
  const key = crypto.pbkdf2Sync(safeword, salt, iterations, keyLength, 'sha256');

  // Create a decipher with the derived key and IV.
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Set up a simple CLI using the readline module.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Do you want to (e)ncrypt or (d)ecrypt? ', (mode) => {
  mode = mode.trim().toLowerCase();

  if (mode === 'e') {
    // Encryption flow
    rl.question('Enter your wallet words: ', (walletWords) => {
      walletWords = walletWords.trim();
      rl.question('Enter your safeword: ', (safeword) => {
        safeword = safeword.trim();
        const encrypted = encrypt(walletWords, safeword);
        console.log('\nEncrypted wallet words (store this JSON safely):');
        console.log(JSON.stringify(encrypted, null, 2));
    
        rl.close();
      });
    });
  } else if (mode === 'd') {
    // Decryption flow: Ask for each value separately.
    rl.question('Enter the SALT value: ', (saltInput) => {
      saltInput = saltInput.trim();
      rl.question('Enter the IV value: ', (ivInput) => {
        ivInput = ivInput.trim();
        rl.question('Enter the ENCRYPTED DATA value: ', (dataInput) => {
          dataInput = dataInput.trim();
          rl.question('Enter your safeword: ', (safeword) => {
            safeword = safeword.trim();
            // Reconstruct the encrypted object.
            const encrypted = {
              salt: saltInput,
              iv: ivInput,
              data: dataInput
            };

            try {
              const decrypted = decrypt(encrypted, safeword);
              console.log('\nDecrypted wallet words:');
              console.log(decrypted);
            } catch (error) {
              console.error('Failed to decrypt. The safeword may be incorrect or the data might have been altered.');
              console.error('Error:', error.message);
            }
            rl.close();
          });
        });
      });
    });
  } else {
    console.log('Invalid option. Please restart and choose either "e" for encrypt or "d" for decrypt.');
    rl.close();
  }
});