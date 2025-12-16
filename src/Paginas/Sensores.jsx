import axios from "axios";
import { useState, useEffect } from "react";
import estilo from "./Sensores.module.css";

export function Sensores() {
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/sensores/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setSensores(response.data))
      .catch((error) =>
        console.error("Erro ao buscar os sensores", error)
      );
  }, []);

  return (
    <div className={estilo.container}>
      <div className={estilo.tableWrapper}>

        <h2 className={estilo.title}>Sensores Cadastrados</h2>

        <div className={estilo.tableContainer}>
          <table className={estilo.table}>
            <thead>
              <tr>
                <th>Tipo de Sensor</th>
                <th>MAC Address</th>
                <th>Unidade de Medida</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Ambiente</th>
              </tr>
            </thead>

            <tbody>
              {sensores.map((sensor) => (
                <tr key={sensor.id}>
                  <td className={estilo.sensorCell}>{sensor.sensor}</td>
                  <td>{sensor.mac_address}</td>
                  <td>{sensor.unidade_medida}</td>
                  <td className={estilo.timestampCell}>{sensor.latitude}</td>
                  <td className={estilo.timestampCell}>{sensor.longitude}</td>
                  <td className={estilo.valorCell}>{sensor.status}</td>
                  <td>{sensor.ambiente}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}