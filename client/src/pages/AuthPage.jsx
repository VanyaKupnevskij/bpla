import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  function handlerDown(event) {
    if (event.key === 'Enter') {
      handlerLogin();
    }
  }

  function handlerChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handlerRegister() {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  }

  async function handlerLogin() {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Скорочення посилання</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                  onChange={handlerChange}
                  placeholder="Уведіть ваш email"
                  id="email"
                  name="email"
                  type="text"
                  value={form.email}
                  className="yellow-input"
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  onChange={handlerChange}
                  onKeyDown={handlerDown}
                  placeholder="Уведіть ваш пароль"
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  className="yellow-input"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={handlerLogin}
              className="btn yellow darken-4"
              disabled={loading}
              style={{ marginRight: 20 }}>
              Увійти
            </button>
            <button
              onClick={handlerRegister}
              className="btn grey lighten-1 black-text"
              disabled={loading}>
              Реєстрація
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
