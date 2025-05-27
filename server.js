const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/join-waitlist', (req, res) => {
  console.log("✅ Received a POST request to /join-waitlist");

  const email = req.body.email;
  console.log("📩 Submitted email:", email);

  if (!email || !email.includes('@')) {
    console.log("❌ Invalid email detected");
    return res.status(400).send('Invalid email');
  }

  try {
    const waitlist = JSON.parse(fs.readFileSync('waitlist.json', 'utf-8'));
    if (!waitlist.includes(email)) {
      waitlist.push(email);
      fs.writeFileSync('waitlist.json', JSON.stringify(waitlist, null, 2));
      console.log("✅ Email saved successfully.");
    } else {
      console.log("⚠️ Email already exists.");
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
