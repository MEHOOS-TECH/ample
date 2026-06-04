export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    return res.status(400).json({
      error: "Missing URL"
    });
  }

  const response = await fetch(
    `https://production-sfo.browserless.io/content?token=${process.env.BROWSERLESS_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: target
      })
    }
  );

  const html = await response.text();

  const image =
    html.match(/https?:\/\/[^"' ]+\.(jpg|jpeg|png|webp)/i)?.[0] || null;

  const video =
    html.match(/https?:\/\/[^"' ]+\.(mp4|m3u8|webm)/i)?.[0] || null;

  res.status(200).json({
    image,
    video
  });
  }
