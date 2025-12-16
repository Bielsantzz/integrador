// Informações dos ambientes
import { useEffect, useState } from "react";
import api from "../services/api";
 
export function useAmbiente() {
    const [data, setData] = useState([]);
 
    useEffect(() => {
        api.get("/historico/")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);
 
    return data;
}