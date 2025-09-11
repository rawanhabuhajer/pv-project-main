import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    res.status(400).json({ error: "Missing URL parameter" });
    return;
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // Get the fully rendered HTML
    const html = await page.content();
    await browser.close();

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (error) {
    console.error("Error rendering page:", error.message);
    res.status(500).json({ error: "Failed to render the requested content." });
  }
}
