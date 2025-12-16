import axios from 'axios';
import { useState, useEffect } from 'react';
import estilo from './Ambientes.module.css';

export function Ambientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setErro('Usuário não autenticado');
      setCarregando(false);
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/ambientes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setAmbientes(response.data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao carregar ambientes');
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <div className={estilo.pageContainer}>
        <div className={estilo.loading}>
          Carregando ambientes...
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className={estilo.pageContainer}>
        <div className={estilo.error}>
          {erro}
        </div>
      </div>
    );
  }

  return (
    <div className={estilo.pageContainer}>
      <div className={estilo.card}>
        <h2 className={estilo.title}>
          Ambientes Monitorados
        </h2>

        <div className={estilo.tableContainer}>
          <table className={estilo.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {ambientes.length === 0 ? (
                <tr>
                  <td colSpan="3" className={estilo.emptyMessage}>
                    Nenhum ambiente cadastrado
                  </td>
                </tr>
              ) : (
                ambientes.map(ambiente => (
                  <tr key={ambiente.id}>
                    <td className={estilo.sensorCell}>
                      {ambiente.local}
                    </td>
                    <td>{ambiente.descricao}</td>
                    <td>{ambiente.nome}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
