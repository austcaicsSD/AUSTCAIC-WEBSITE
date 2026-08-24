import { stdin, stdout } from "node:process";

const FOCUS_HINT = "Run this in an interactive terminal.";

/**
 * Reads a line with the characters masked. readline's _writeToOutput hook
 * swallowed the prompt itself on Windows terminals, so this drives stdin
 * directly.
 */
export function promptHidden(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error(FOCUS_HINT));
      return;
    }

    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    let value = "";

    const finish = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stdout.write("\n");
      resolve(value);
    };

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") return finish();

        if (char === "\u0003") {
          stdout.write("\n");
          process.exit(130);
        }

        if (char === "\u007f" || char === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }

        if (char < " ") continue;

        value += char;
        stdout.write("*");
      }
    };

    stdin.on("data", onData);
  });
}

export function promptLine(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error(FOCUS_HINT));
      return;
    }

    stdout.write(question);
    stdin.setEncoding("utf8");
    stdin.resume();

    const onData = (chunk) => {
      stdin.pause();
      stdin.removeListener("data", onData);
      resolve(chunk.toString().trim());
    };

    stdin.on("data", onData);
  });
}

export function passwordProblems(password, minLength = 12) {
  const problems = [];
  if (password.length < minLength)
    problems.push(`must be at least ${minLength} characters`);
  if (!/[a-z]/.test(password)) problems.push("needs a lowercase letter");
  if (!/[A-Z]/.test(password)) problems.push("needs an uppercase letter");
  if (!/[0-9]/.test(password)) problems.push("needs a digit");
  if (!/[^A-Za-z0-9]/.test(password)) problems.push("needs a symbol");
  return problems;
}
