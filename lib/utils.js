import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(...inputs);
}

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target.result;
      resolve(result.split(",")[1]);
    };

    reader.onerror = () => reject(new Error("File read failed"));

    reader.readAsDataURL(file);
  });
}

export function safeParseJSON(raw) {
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}