export default async function handler(req, res) {
  const question = req.query.question || "Hello";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Judy, a helpful assistant." },
        { role: "user", content: question }
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ answer: data.choices[0].message.content });
}
