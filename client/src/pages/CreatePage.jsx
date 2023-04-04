import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/context';
import { useMessage } from '../hooks/message.hook';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const message = useMessage();
  const { request } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  async function handlerPress(event) {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          },
        );
        navigate('/detail/' + data.link._id);
      } catch (error) {
        message(error.message);
      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={handlerPress}
            placeholder="Вставте ваше посилання"
            id="link"
            type="text"
            value={link}
          />
          <label htmlFor="link">Посилання</label>
        </div>
      </div>
    </div>
  );
}
