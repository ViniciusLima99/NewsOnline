import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const Register = () => {

    navigate('/cadastro');

  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Salva o token no localStorage
      alert("Login realizado com sucesso!");
      navigate('/'); // Redireciona para a página principal
    } else {
      setError(data.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="text-white d-flex flex-column align-items-center justify-content-center largm">
      <h2 className="tituloCadastro">Login</h2>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="form-group p-4 border rounded shadow-lg form-user">
          {error && <p className="text-danger">{error}</p>}

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="senha">Senha</label>
            <input type="password" className="form-control" name="senha" id="senha" value={formData.senha} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-cinza">Entrar</button>
          <button type="button" className="btn btn-dark mx-1" onClick={Register}>Cadastrar</button>

        </form>
        
      </div>
    </div>
  );
}

export default Login;
