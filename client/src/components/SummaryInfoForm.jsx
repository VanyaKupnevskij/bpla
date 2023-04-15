import React, { useEffect } from 'react';
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

import TextInput from './TextInput';

export default function SummaryInfoForm({ triggerChange, handleSave }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Загальна інформація
      </Typography>
      <Grid container spacing={3}>
        <TextInput
          sm={6}
          required
          id="name"
          name="name"
          label="Назва"
          placeholder="Назва БПЛА..."
          triggerChange={triggerChange}
          handleSave={handleSave}
        />
        <TextInput
          sm={6}
          required
          id="model"
          name="model"
          label="Модель"
          placeholder="Модель БПЛА..."
          triggerChange={triggerChange}
          handleSave={handleSave}
        />
        <TextInput
          xs={12}
          id="shortDescription"
          name="shortDescription"
          label="Короткий опис"
          placeholder="Короткий опис БПЛА..."
          triggerChange={triggerChange}
          handleSave={handleSave}
          multiline
        />
        <TextInput
          xs={12}
          id="description"
          name="description"
          label="Детальний опис загальньої інформації"
          placeholder="Опис..."
          triggerChange={triggerChange}
          handleSave={handleSave}
          multiline
        />
        <TextInput
          xs={12}
          id="vendor"
          name="vendor"
          label="Виробник"
          placeholder="Виробник БПЛА..."
          triggerChange={triggerChange}
          handleSave={handleSave}
        />
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Країна виробник
          </Typography>
          <SelectInput
            label="Країна"
            name="contryVendor"
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
          <SelectInput
            label="Тип"
            name="typeEngine"
            variants={['Електричний', 'Дізельний', 'Бензиновий']}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Функії
          </Typography>
          <MultipleSelectChip
            label="Функції"
            name="functions"
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
            name="levelsApply"
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
            name="levelWarActions"
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
            name="class"
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
          <NumberSlider name="flightRange" min={0} max={2000} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <FlightRoundedIcon />
            Розмах крил (м)
          </Typography>
          <NumberSlider name="wingspan" min={0} max={30} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <ScaleRoundedIcon />
            Максимальна злітна маса (кг)
          </Typography>
          <NumberSlider name="maxFlyWeight" min={0} max={15000} step={50} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <ScaleRoundedIcon />
            Корисне навантаження (кг)
          </Typography>
          <NumberSlider name="payloadWeight" min={0} max={2000} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <SpeedRoundedIcon />
            Максимальна швидкість (км/год)
          </Typography>
          <NumberSlider name="maxSpeed" min={0} max={800} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <SpeedRoundedIcon />
            Крейсерна швидкість (км/год)
          </Typography>
          <NumberSlider name="cruiseSpeed" min={0} max={500} step={10} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <FlightTakeoffRoundedIcon />
            Максимальна висота польоту (км)
          </Typography>
          <NumberSlider name="maxFlyHeight" min={0} max={50} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <WifiTetheringRoundedIcon />
            Операційна висота використання (км)
          </Typography>
          <NumberSlider name="heightOfUse" min={0} max={50} step={1} countMarkBase={5} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <AccessTimeRoundedIcon />
            Тривалість польоту (годин)
          </Typography>
          <NumberSlider name="flyDuration" min={0} max={75} step={1} countMarkBase={5} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
