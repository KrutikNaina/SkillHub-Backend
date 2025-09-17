// index.js
import app from "./server.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running locally at http://localhost:${PORT}`);
});
