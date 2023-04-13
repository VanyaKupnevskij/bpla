import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MultipleSelectChip from './MultipleSelectChip';
import SelectInput from './SelectInput';
import NumberSlider from './NumberSlider';

import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

export default function SummaryInfoForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Загальна інформація
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Назва"
            fullWidth
            autoComplete="model"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="model"
            name="model"
            label="Модель"
            fullWidth
            autoComplete="model"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-textarea"
            label="Короткий опис"
            placeholder="Короткий опис бпла..."
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-textarea"
            label="Детальний опис загальньої інформації"
            placeholder="Опис..."
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="vendor"
            name="vendor"
            label="Виробник"
            fullWidth
            autoComplete="vendor"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Країна виробник
          </Typography>
          <SelectInput
            label="Країна"
            variants={[
              'Україна',
              'Австралія',
              'Австрія',
              'Азербайджан',
              'Аргентина',
              'Білорусь',
              'Бельгія',
              'Болгарія',
              'Бразилія',
              'Велика Британія',
              'Вірменія',
              'Ізраїль',
              'Індія',
              'Іран',
              'Італія',
              'Іспанія',
              'Казахстан',
              'Канада',
              'Китай',
              'Німеччина',
              'Норвегія',
              "Об'єднані Арабські Емірати",
              'Польща',
              'Південно-Африканська Республіка',
              'США',
              'Туреччина',
              'Франція',
              'Чехія',
              'Швейцарія',
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Тип двигуна
          </Typography>
          <SelectInput label="Тип" variants={['Електричний', 'Дізельний', 'Бензиновий']} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Функії
          </Typography>
          <MultipleSelectChip
            label="Функції"
            variants={[
              'Розвідка',
              'Цілевказання',
              'Відновлення та ретрансляція зв’язку',
              'Підсвічування в темний час',
              'Радіаційна, хімічна та біологічна розвідки',
              'Виявлення мін',
              'Пошук і рятування',
              'Гасіння пожеж',
              'Транспортування вантажів',
              'Протидія аматорським БпЛА',
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Рівень застосування
          </Typography>
          <MultipleSelectChip
            label="Рівень"
            variants={[
              'ТВД',
              'Оперативна група',
              'Бригада',
              'Батальйон',
              'Рота',
              'Взвод',
              'Відділення',
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Рівень воєнних дій
          </Typography>
          <SelectInput
            label="Рівень"
            variants={[
              'Cтратегічний',
              'Оперативний',
              'Тактичний',
              'Тактичне формування',
              'Тактичний підрозділ',
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Класс
          </Typography>
          <SelectInput
            label="Класс"
            variants={[
              'МікроБпЛА',
              'МініБпЛА',
              'БпЛА близької дії',
              'БпЛА малої дальності',
              'БпЛА середньої дальності',
              'Мало-висотні БпЛА глибинної розвідки',
              'БпЛА великої дальності',
              'Середньовисотні БпЛА великої тривалості польоту',
              'Висотні БпЛА великої тривалості польоту',
              'Ударні БпЛА',
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Дальність польоту (км)
          </Typography>
          <NumberSlider min={0} max={2000} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon />
            Розмах крил (м)
          </Typography>
          <NumberSlider min={0} max={30} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <ScaleRoundedIcon />
            Максимальна злітна маса (кг)
          </Typography>
          <NumberSlider min={0} max={15000} step={50} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <ScaleRoundedIcon />
            Корисне навантаження (кг)
          </Typography>
          <NumberSlider min={0} max={2000} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <SpeedRoundedIcon />
            Максимальна швидкість (км/год)
          </Typography>
          <NumberSlider min={0} max={800} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <SpeedRoundedIcon />
            Крейсерна швидкість (км/год)
          </Typography>
          <NumberSlider min={0} max={500} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <FlightTakeoffRoundedIcon />
            Максимальна висота польоту (км)
          </Typography>
          <NumberSlider min={0} max={50} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <WifiTetheringRoundedIcon />
            Операційна висота використання (км)
          </Typography>
          <NumberSlider min={0} max={50} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <AccessTimeRoundedIcon />
            Тривалість польоту (годин)
          </Typography>
          <NumberSlider min={0} max={75} step={1} countMarkBase={5} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
