export async function postInfo(name, total_count, date) {
  try {
    const res = await fetch("https://countbites.tech/info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, total_count, date }),
    });

    const result = await res.json();
    console.log("Posted successfully:", result);
  } catch (error) {
    console.error("Error posting info:", error);
  }
}
