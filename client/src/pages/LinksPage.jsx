import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/context';
import ListLinks from '../components/ListLinks';

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const message = useMessage();
  const { token } = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const data = await request('api/link/', 'GET', null, {
        Authorization: 'Bearer ' + token,
      });
      setLinks(data);
    } catch (error) {
      message(error.message);
    }
  }, [request, message, token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return !loading && <ListLinks links={links} />;
}
