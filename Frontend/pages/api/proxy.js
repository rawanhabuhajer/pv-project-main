import axios from "axios";

export default async function handler(req, res) {
  const url = req.query.url; // Target URL to fetch

  if (!url) {
    res.status(400).json({ error: "Missing URL parameter" });
    return;
  }

  try {
    const response = await axios.get(url, { responseType: "text" });

    // Rewrite URLs for all resources (CSS, JS, Images, etc.)
    const proxiedHtml = response.data.replace(
      /(src|href)="([^"]+)"/g,
      (match, attr, resourceUrl) => {
        const absoluteUrl = new URL(resourceUrl, url).toString(); // Resolve relative URLs
        return `${attr}="/api/proxy?url=${encodeURIComponent(absoluteUrl)}"`;
      }
    );

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(proxiedHtml);
  } catch (error) {
    console.error("Error fetching content:", error.message);
    res.status(500).json({ error: "Failed to fetch the requested content." });
  }
}
