/* JavaScript */

const readline = require("readline");


const encrypt = (str, shift) =>
  str
    .toUpperCase()
    .split("")
    .map((c) => (/[A-Z]/.test(c) ? shiftChar(c, shift) : c))
    .join("");

const decrypt = (str, shift) => encrypt(str, -shift);

const solve = (plainText, maxShift) =>
  Array.from({ length: maxShift + 1 }, (_, i) => {
    const shift = maxShift - i;
    return `Caesar ${shift}: ${encrypt(plainText, shift)}`;
  }).join("\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const shiftChar = (char, shift) => {
  const base = "A".charCodeAt(0);
  const code = char.charCodeAt(0);
  return String.fromCharCode(((code - base + shift + 26) % 26) + base);
};

const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

(async () => {
  const input = await ask("Enter a string to encrypt: ");
  const shift = parseInt(await ask("Enter shift amount (0–25): "), 10);

  const encrypted = encrypt(input, shift);
  const decrypted = decrypt(encrypted, shift);

  console.log("\n--- Results ---");
  console.log("Encrypted:", encrypted);
  console.log("Decrypted:", decrypted);
  console.log("\nSolve Output:\n");
  console.log(solve(input, 26));
  rl.close();
})();
