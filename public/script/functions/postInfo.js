export async function post(name, amount) {
  const option = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, amount }),
  };
  try {
    const response = await fetch("http://localhost:3000/contribute", option);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
