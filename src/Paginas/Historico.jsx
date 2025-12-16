import axios from 'axios';
import { useState, useEffect } from 'react';
import estilo from './Historico.module.css';

export function Historico() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/historico/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setHistorico(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Erro ao carregar histórico de sensores');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={estilo.container}>
        <div className={estilo.loading}>
          Carregando histórico...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={estilo.container}>
        <div className={estilo.error}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={estilo.container}>
      <div className={estilo.tableWrapper}>
        <h2 className={estilo.title}>
          Histórico de Sensores
        </h2>

        <div className={estilo.tableContainer}>
          <table className={estilo.table}>
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Data e Hora</th>
              </tr>
            </thead>
            <tbody>
              {historico.length === 0 ? (
                <tr>
                  <td colSpan="3" className={estilo.emptyMessage}>
                    Nenhum registro no histórico
                  </td>
                </tr>
              ) : (
                historico.map(sensor => (
                  <tr key={sensor.id}>
                    <td>{sensor.sensor}</td>
                    <td>{sensor.valor}</td>
                    <td>{sensor.timestamp}</td>
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
