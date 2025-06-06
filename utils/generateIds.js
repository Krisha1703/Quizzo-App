// Generate a unique ID based on the current timestamp
export const generateId = (prefix) => {
  return `${prefix}${Date.now().toString().slice(-6)}`;
};