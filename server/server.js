// server.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const FileStore = require("session-file-store")(session);
const dotenv = require("dotenv");
const path = require("path");
const next = require("next");
const dealsRouter = require("./routes/deals");
const authRouter = require("./login/auth.js");
const productsRouter = require('./routes/products');
const postsRouter = require('./routes/posts');

// Load .env config
dotenv.config({ path: ".env" });

const port = process.env.SERVER_PORT || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, port });
const handle = nextApp.getRequestHandler();

const app = express();

// ✅ Avoid disturbing Next.js API routes like /api/auth
app.use((req, res, next) => {
  if (req.url.startsWith("/api/auth")) return next();
  bodyParser.urlencoded({ extended: false })(req, res, next);
});

app.use((req, res, next) => {
  if (req.url.startsWith("/api/auth")) return next();
  bodyParser.json()(req, res, next);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/deals", dealsRouter);
app.use('/server-api/products', productsRouter);
app.use('/server-api/wishlist', require('./routes/wishlist'));
app.use('/server-api/cart', require('./routes/cart'));
app.use('/server-api/posts', require('./routes/posts'));
app.use('/server-api/search', require('./routes/search'));


const protectedRouter = require('./routes/protected');
app.use('/serverapi/protected', protectedRouter);



nextApp
  .prepare()
  .then(() => {
    app.use(express.static(path.join(__dirname, "../", "public")));

    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Next.js init failed:", err);
    process.exit(1);
  });


