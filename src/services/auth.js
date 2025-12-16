// Arquivo também para conexão com Django
import axios from "axios";
 
export async function login(username, password) {
    const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: username,
        password: password
    });
    return response.data;
}