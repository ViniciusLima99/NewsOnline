import { useEffect, useState } from "react";

function Principal() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetch("https://api.gdeltproject.org/api/v2/doc/doc?query=tecnologia&format=json&mode=ArtList&sourcelang=POR&maxrecords=24")
            .then(response => response.json())
            .then(data => setNoticias(data.articles || []))
            .catch(error => console.error("Erro ao buscar notícias:", error));
    }, []);

    return (
        <div className="container principal">
            <h1 className="pt-2 mb-4 text-center titulo-principal">Últimas Notícias</h1>
            <div className="row">
                {noticias.map((noticia, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card h-100">
                            {noticia.image && <img src={noticia.image} className="card-img-top" alt="Imagem da notícia" />}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{noticia.title}</h5>
                                <p className="card-text">{noticia.snippet}</p>
                                <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">Leia mais</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default Principal;