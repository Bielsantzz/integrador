import estilo from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import api from "../services/api";
import axios from 'axios';

const schemaLogin = z.object({
    username: z.string()
        .trim()
        .min(1, 'Informe o usuário')
        .max(5, 'Máximo de 5 caracteres'),

    password: z.string()
        .trim()
        .min(1, 'Informe uma senha')
        .max(3, 'Máximo de 3 caracteres'),
});

export function Login() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaLogin),
    });

    async function enviarDados(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: data.username,
                password: data.password
            });

            const { access, refresh } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            navigate('inicial');
        } catch (error) {
            console.error('Erro de autenticação', error);
            setAuthError("Dados inválidos! Verifique suas credenciais.");
        }
    }

    return (
        <section className={estilo.container}>
            <form className={estilo.formulario} onSubmit={handleSubmit(enviarDados)}>

                <header className={estilo.logoContainer}>
                    <img src="/src/assets/logo.png" alt="Logo" className={estilo.logo}/>
                    <h2 className={estilo.title}>Smart City</h2>
                </header>

                <label htmlFor="usuario">Usuário:</label>
                <input id="usuario" type="text" placeholder="Digite seu usuário" {...register("username")} />
                {errors.username && <p className={estilo.error}>{errors.username.message}</p>}

                <label htmlFor="senha">Senha:</label>
                <input id="senha" type="password" placeholder="Digite sua senha" {...register("password")} />
                {errors.password && <p className={estilo.error}>{errors.password.message}</p>}

                {authError && <p className={estilo.error}>{authError}</p>}

                <button className={estilo.buttonLogin}>Entrar</button>
            </form>
        </section>
    );
}