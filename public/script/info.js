export async function info() {
  try {
    const response = await fetch("http://localhost:3000/info");
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error");
    return null;
  }
}
