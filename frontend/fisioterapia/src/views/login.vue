<template>
<div class="login-bg">
    <form class="login-form" @submit.prevent>
        
        <div class="login-logo-circle">
            <img src="https://img.icons8.com/?size=100&id=94&format=png&color=000000" alt="Logo" />
        </div>
        <h2 class="login-title">Bienvenido a OrtoRehab Vertel</h2>
        <p class="login-subtitle">Accede a tu cuenta</p>
        <div class="login-input-group">
            <label for="user">Usuario</label>
            <input type="email" id="user" v-model="user" placeholder="Ingresa tu usuario" required />
        </div>
        <div class="login-input-group">
            <label for="pass">Contraseña</label>
            <input type="password" id="pass" v-model="pass" placeholder="Ingresa tu contraseña" required />
        </div>
        <button class="login-btn" type="submit">Ingresar</button>
    </form>
</div>
</template>

<script>
export default {
    data: () => ({
        user: "",
        pass: "",
    })

}
</script>

<style>
.login-bg {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/images/fisio_inicio.jpg');
    background-size: cover;
    background-position: center;
}

.login-logo-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e0f7fa 60%, #34836e 100%);
    box-shadow: 0 2px 8px rgba(44, 118, 97, 0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.login-logo-circle img {
    width: 54px;
    height: 54px;
    filter: drop-shadow(0 2px 6px rgba(44, 118, 97, 0.18));
}

.login-form {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    padding: 2.5rem 2rem;
    min-width: 320px;
    max-width: 370px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-logo img {
    width: 60px;
    margin-bottom: 1rem;
}

.login-title {
    font-size: 1.7rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    text-align: center;
}

.login-subtitle {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    text-align: center;
}

.login-input-group {
    width: 100%;
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
}

.login-input-group label {
    font-size: 0.95rem;
    color: #2d3748;
    margin-bottom: 0.3rem;
}

.login-input-group input {
    padding: 0.7rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.7rem;
    font-size: 1rem;
    background: #f7fafc;
    transition: border 0.2s;
}

.login-input-group input:focus {
    border-color: #3182ce;
    outline: none;
}

.login-btn {
    width: 100%;
    padding: 0.8rem 0;
    background: linear-gradient(90deg, #3182ce 60%, #00b4d8 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0 2px 8px rgba(49, 130, 206, 0.12);
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
    background: linear-gradient(90deg, #2563eb 60%, #0096c7 100%);
    box-shadow: 0 4px 16px rgba(49, 130, 206, 0.18);
}
</style>
