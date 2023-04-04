import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { useMessage } from '../hooks/message.hook';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

export default function DetailPage() {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState({});
  const message = useMessage();
  const { request, loading } = useHttp();
  const linkId = useParams().id;

  useEffect(() => {
    async function getLink() {
      try {
        const data = await request('/api/link/' + linkId, 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        setLink(data);
      } catch (error) {
        message(error.message);
      }
    }
    getLink();
  }, [token, linkId, request, message]);

  if (loading) {
    return <Loader />;
  }

  return !loading && link && <LinkCard link={link} />;
}
