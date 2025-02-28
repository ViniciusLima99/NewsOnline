require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/bancoteste")
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.log(err));

const User = require("./models/Usuarios");

// Rota para cadastrar um novo usuário (com senha criptografada)
app.post("/users", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    const user = new User({ nome, email, senha: hashedSenha });
    await user.save();

    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error.message);
  }
});

// Rota de login (gera um token JWT)
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Middleware para autenticação
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Rota protegida: apenas usuários autenticados podem acessar
app.get("/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-senha"); // Exclui a senha
  res.json(user);
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
