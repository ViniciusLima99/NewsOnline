import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "" // Novo campo de senha
  });

  const navigate = useNavigate();

  // Atualiza o estado quando o usuário digita no input
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const login = () => {
    navigate('/login');
  }
  // Enviar os dados para o backend
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setFormData({ nome: "", email: "", senha: "" }); // Limpa o formulário
      navigate('/login');
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="text-white d-flex flex-column align-items-center justify-content-center largm">
      <h2 className="tituloCadastro">Cadastro de usuário</h2>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="form-group p-4 border rounded shadow-lg form-user">
            <div className="mb-3">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" name="nome" id="nome" onChange={handleChange} value={formData.nome} required />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" id="email" onChange={handleChange} value={formData.email} required />
            </div>

            <div className="mb-3">
              <label htmlFor="senha">Senha</label>
              <input type="password" className="form-control" name="senha" id="senha" onChange={handleChange} value={formData.senha} required />
            </div>

          <button type="submit" className="btn btn-cinza">Cadastrar</button>
          <button type="button" onClick={login} className="btn btn-dark mx-1" > Login </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
