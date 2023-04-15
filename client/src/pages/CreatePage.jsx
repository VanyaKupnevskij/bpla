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

function getStepContent(tempStep, activeStep, handleSave) {
  switch (activeStep) {
    case 0:
      return <SummaryInfoForm triggerChange={tempStep} handleSave={handleSave} />;
    case 1:
      return <PhotoForm triggerChange={tempStep} handleSave={handleSave} />;
    case 2:
      return <Review triggerChange={tempStep} handleSave={handleSave} />;
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
  const [tempStep, setTempStep] = React.useState(0);

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

  const handleSave = () => {
    setActiveStep(tempStep);
  };

  const handleNext = () => {
    setTempStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setTempStep((prev) => prev - 1);
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
            {getStepContent(tempStep, activeStep, handleSave)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Назад
                </Button>
              )}

              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Додати дані' : 'Далі'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
