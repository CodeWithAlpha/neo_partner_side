export const downloadJsonAsTxt = async (
  endpoint: string,
  name: string,
  type: string
) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const jsonData = await response.json();
    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with indentation

    const blob = new Blob([jsonString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${name}.${type}`;
    document.body.appendChild(anchor); // Required for Firefox
    anchor.click();
    document.body.removeChild(anchor); // Clean up

    URL.revokeObjectURL(url); // Free up memory
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export function flatObject(obj: any, parentKey = "", result: any = {}): any {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flatObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  });
  return result;
}
