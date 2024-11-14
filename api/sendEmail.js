import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, email, title, text } = req.body;

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.VITE_EMAILJS_SERVICE_ID,
          template_id: process.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: process.env.VITE_EMAILJS_USER_ID,
          template_params: {
            name,
            email,
            title,
            text,
          },
        }),
      }
    );

    console.log(process.env.VITE_EMAILJS_SERVICE_ID)

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({ data });
    } else {
      return res
        .status(response.status)
        .json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return response.status(500).json({ error: error.message });
  }
}
