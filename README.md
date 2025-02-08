# 🔐 Seed Lock

A secure tool to encrypt and safely store your cryptocurrency wallet seed phrases. This allows you to backup your wallet words in cloud services or note-taking apps by encrypting them with a password of your choice.

## 📦 Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 12 or higher)
2. Clone this repository:

```bash
git clone https://github.com/IbsenFahir/seed-lock.git
cd seed-lock
```

3. Install dependencies:

```bash
npm install
# or
yarn
```

## 🚀 Usage

Run the program:

```bash
node index.js
```

### To Encrypt:

1. Choose 'e' when prompted
2. Enter your wallet words
3. Enter your password (safeword)
4. Save the JSON output somewhere safe

### To Decrypt:

1. Choose 'd' when prompted
2. Enter the salt, IV, and encrypted data from your saved JSON
3. Enter your password
4. Your wallet words will be displayed

## 📝 Example

Encrypting wallet words:

```
Do you want to (e)ncrypt or (d)ecrypt? e
Enter your wallet words: word1 word2 word3 ... word12
Enter your safeword: mySecurePassword123

Encrypted wallet words (store this JSON safely):
{
  "salt": "2f3a45b12c...",
  "iv": "8e2f4a...",
  "data": "9c4f2e7b..."
}
```

Decrypting wallet words:

```
Do you want to (e)ncrypt or (d)ecrypt? d
Enter the SALT value: 2f3a45b12c...
Enter the IV value: 8e2f4a...
Enter the ENCRYPTED DATA value: 9c4f2e7b...
Enter your safeword: mySecurePassword123

Decrypted wallet words:
word1 word2 word3 ... word12
```

## 🔒 Security Best Practices

1. **Password Selection**

   - Use a long, random password
   - Mix uppercase, lowercase, numbers, and symbols
   - Don't reuse passwords from other services
2. **Storage**

   - Store the encrypted data and password separately
   - Keep multiple backups of the encrypted data
   - Test decryption after encryption to verify everything works
3. **Usage**

   - Use this tool on a secure, offline computer when possible
   - Clear your terminal history after use
   - Don't leave the decrypted words visible on screen

## ⚖️ License

MIT License - See LICENSE file for details

## ⚡ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you find a bug or have a suggestion, please open an issue on GitHub.
