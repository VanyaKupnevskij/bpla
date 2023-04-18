import React from 'react';
import { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/context';
import { useMessage } from '../hooks/message.hook';
import { useNavigate, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SummaryInfoForm from '../components/SummaryInfoForm';
import PhotoForm from '../components/PhotoForm';
import Review from '../components/Review';
import { FormContext } from '../context/formContext';
import useUploadFiles from '../hooks/upload-files.hook';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 3 }}>
      {'Copyright © '}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Головна сторінка
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Інформація', 'Фото', 'Огляд'];

function StepContent({ activeStep }) {
  switch (activeStep) {
    case 0:
      return <SummaryInfoForm />;
    case 1:
      return <PhotoForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CreatePage() {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const message = useMessage();
  const { request } = useHttp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const { states } = useContext(FormContext);
  const { formData, upload, getBplaId } = useUploadFiles();

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

  const handleSubmit = () => {
    formData.current = new FormData();

    for (const [key, value] of Object.entries(states.current)) {
      if (key == 'images') continue;

      if (Array.isArray(value)) {
        for (let item of value) {
          formData.current.append(String(key), item);
        }
      } else {
        formData.current.append(String(key), value);
      }
    }

    upload();
  };

  const handleGetFile = async () => {
    const id = '643eb44f44908decc575d27d';
    const data = await getBplaId(id);
    console.log('Bpla:', data);
    states.current.images = [];
    for (let photo of data.photos) {
      states.current.images.push(photo);
    }
    // states.current.images.push(URL.createObjectURL(data));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, minHeight: 'calc(100vh - 12rem)' }}>
      <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Додати новий БПЛА до бази
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Створенний новий запис у базі
            </Typography>
            <Typography variant="subtitle1">Айді запису #2001539.</Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StepContent activeStep={activeStep} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Назад
                </Button>
              )}
              <Button onClick={handleGetFile} sx={{ mt: 3, ml: 1 }}>
                Get server file
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
                  Додати дані
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  Далі
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
