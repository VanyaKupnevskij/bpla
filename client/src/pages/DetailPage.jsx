import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImagesCarousel from '../components/ImagesCarousel';
import TableParameters from '../components/TableParameters';
import useBplaServer from '../hooks/bplaServer.hook';
import { Container } from '@mui/material';
import RadarChart from '../components/RadarChart';
import Loader from '../components/Loader';

export default function DetailPage() {
  const [data, setData] = useState(null);
  const [chartValues, setChartValues] = useState([]);
  const { getBplaId, isLoading } = useBplaServer();
  const bplaId = useParams().id;

  async function getBpla() {
    setData(await getBplaId(bplaId));
  }

  useEffect(() => {
    getBpla();
  }, []);

  useEffect(() => {
    if (data) {
      setChartValues(BuildCartValues(data));
    }
  }, [data]);

  function BuildCartValues(baseData) {
    let values = [{ label: '', data: 0, enabled: true }];
    const whoIncluding = [
      { key: 'flightRange', label: 'Макс. Дальність польоту', enabled: true },
      { key: 'wingspan', label: 'Розмах крил', enabled: true },
      { key: 'maxFlyWeight', label: 'Злітна маса', enabled: true },
      { key: 'payloadWeight', label: 'Корисне навантаження', enabled: true },
      { key: 'maxSpeed', label: 'Максимальна швидкіть', enabled: true },
      { key: 'cruiseSpeed', label: 'Крейсерна швидкіть', enabled: true },
      { key: 'maxFlyHeight', label: 'Макс. висота польоту', enabled: true },
      { key: 'heightOfUse', label: 'Операційна висота', enabled: true },
      { key: 'flyDuration', label: 'Тривалість польоту', enabled: true },
    ];

    values = [];
    for (let parameter of whoIncluding) {
      if (baseData[parameter.key]) {
        values.push({
          label: parameter.label,
          data: baseData[parameter.key],
          enabled: parameter.enabled,
        });
      }
    }

    return values;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container component="main" maxWidth="md">
      {!isLoading && (
        <>
          <ImagesCarousel images={data.photos} />
          <TableParameters datas={data} />

          {chartValues.length !== 0 && <RadarChart init={chartValues} />}
        </>
      )}
    </Container>
  );
}
