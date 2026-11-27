export const searchInternet = async ({ query }) => {
  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("Please provide a search query.");
  }

  const apiKey = process.env.SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error("Tavily API key is missing.");
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 5,
      include_answer: true
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail?.error || "Internet search failed.");
  }

  return {
    query: data.query,
    answer: data.answer || null,
    results: data.results.map(result => ({
      title: result.title,
      description: result.content,
      url: result.url
    }))
  };
};
