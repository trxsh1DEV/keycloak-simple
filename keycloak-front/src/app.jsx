// App.js
import React, { useEffect, useState } from "react";
import { securedApi } from "./components/request";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await securedApi();
        const response = await api.get("/protected"); // Exemplo de rota protegida no backend
        setData(response.data);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dados Protegidos</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Carregando...</p>}
    </div>
  );
}

export default App;
