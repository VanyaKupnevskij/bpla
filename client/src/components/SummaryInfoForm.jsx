import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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

export default function SummaryInfoForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Загальна інформація
      </Typography>
      <Grid container spacing={3}>
        <TextInput
          sm={6}
          required
          id="_name"
          name="_name"
          label="Назва"
          placeholder="Назва БПЛА..."
        />
        <TextInput
          sm={6}
          required
          id="model"
          name="model"
          label="Модель"
          placeholder="Модель БПЛА..."
        />
        <TextInput
          xs={12}
          id="shortDescription"
          name="shortDescription"
          label="Короткий опис"
          placeholder="Короткий опис БПЛА..."
          multiline
        />
        <TextInput
          xs={12}
          id="description"
          name="description"
          label="Детальний опис загальньої інформації"
          placeholder="Опис..."
          multiline
        />
        <TextInput
          xs={12}
          id="vendor"
          name="vendor"
          label="Виробник"
          placeholder="Виробник БПЛА..."
        />
        <SelectInput
          xs={12}
          title="Країна виробник"
          name="contryVendor"
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
        <SelectInput
          xs={12}
          title="Тип двигуна"
          name="typeEngine"
          label="Тип"
          variants={['Електричний', 'Дізельний', 'Бензиновий']}
        />
        <MultipleSelectChip
          xs={12}
          title="Функії"
          name="functions"
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
        <MultipleSelectChip
          xs={12}
          title="Рівень застосування"
          name="levelsApply"
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
        <SelectInput
          xs={12}
          title="Рівень воєнних дій"
          name="levelWarActions"
          label="Рівень"
          variants={[
            'Cтратегічний',
            'Оперативний',
            'Тактичний',
            'Тактичне формування',
            'Тактичний підрозділ',
          ]}
        />
        <SelectInput
          xs={12}
          title="Класс"
          name="_class"
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
        <NumberSlider
          xs={12}
          title="Дальність польоту (км)"
          name="flightRange"
          min={0}
          max={2000}
          step={10}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={FlightRoundedIcon}
          xs={12}
          title="Розмах крил (м)"
          name="wingspan"
          min={0}
          max={30}
          step={1}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={ScaleRoundedIcon}
          xs={12}
          title="Максимальна злітна маса (кг)"
          name="maxFlyWeight"
          min={0}
          max={15000}
          step={50}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={ScaleRoundedIcon}
          xs={12}
          title="Корисне навантаження (кг)"
          name="payloadWeight"
          min={0}
          max={2000}
          step={10}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={SpeedRoundedIcon}
          xs={12}
          title="Максимальна швидкість (км/год)"
          name="maxSpeed"
          min={0}
          max={800}
          step={10}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={SpeedRoundedIcon}
          xs={12}
          title="Крейсерна швидкість (км/год)"
          name="cruiseSpeed"
          min={0}
          max={500}
          step={10}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={FlightTakeoffRoundedIcon}
          xs={12}
          title="Максимальна висота польоту (км)"
          name="maxFlyHeight"
          min={0}
          max={50}
          step={1}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={WifiTetheringRoundedIcon}
          xs={12}
          title="Операційна висота використання (км)"
          name="heightOfUse"
          min={0}
          max={50}
          step={1}
          countMarkBase={5}
        />
        <NumberSlider
          IconComponent={AccessTimeRoundedIcon}
          xs={12}
          title="Тривалість польоту (годин)"
          name="flyDuration"
          min={0}
          max={75}
          step={1}
          countMarkBase={5}
        />
      </Grid>
    </>
  );
}
