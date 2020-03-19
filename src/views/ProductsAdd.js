import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { productAdd, productUpdate } from 'actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import UserFormTemplate from 'templates/UserFormTemplate';
import Bar from 'components/molecules/Bar/Bar';
import Button from 'components/atoms/Button/Button';
import Input, { TextArea } from 'components/atoms/Input/Input';
import Select from 'components/atoms/Select/Select';
import iconModel from 'assets/icons/model.svg';
import iconBrand from 'assets/icons/brand.svg';
import iconMilAge from 'assets/icons/milage.svg';
import iconFuel from 'assets/icons/fuel.svg';
import iconYear from 'assets/icons/year.svg';
import iconPower from 'assets/icons/power.svg';
import iconGearBox from 'assets/icons/gearbox.svg';
import iconDrive from 'assets/icons/drive.svg';
import iconCountry from 'assets/icons/country.svg';
import iconPrice from 'assets/icons/price.svg';

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  grid-row-gap: 20px;
  grid-column-gap: 40px;
  padding: 30px;
  ${({ center }) =>
    center &&
    css`
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      justify-items: center;
    `}
`;
const countryList = [
  'Austria',
  'Francja',
  'Włochy',
  'Japonia',
  'Niemcy',
  'Polska',
  'Portugalia',
  'Rosja',
  'Korea Południowa',
  'Hiszpania',
  'Szwecja',
  'Szwajcaria',
  'Stany Zjednoczone',
  'Wielka Brytania',
];

const model = [
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Dacia',
  'Daewoo',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Lancia',
  'Land Rover',
  'Lexus',
  'Lotus',
  'Lincoln',
  'Maserati',
  'Maybach',
  'Mazda',
  'McLaren',
  'Mercedes-Benz',
  'MG',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Rolls-Royce',
  ' Rover',
  'Seat',
  'Skoda',
  'Smart',
  'Subaru',
  'Suzuki',
  'UAZ',
  'Toyota',
  'Trabant',
  'Volkswagen',
];

const ProductAdd = ({ location, productAdd, productUpdate, product, id }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <UserFormTemplate>
      <Bar title={id ? 'Edytuj produkt' : 'Nowy produkt'} />
      <Formik
        initialValues={
          product
            ? product
            : {
                brand: '',
                model: '',
                mileage: '',
                fuel: '',
                year: '',
                power: '',
                gearbox: '',
                drive: '',
                country: '',
                price: '',
                vin: '',
                regNumber: '',
                description: '',
              }
        }
        onSubmit={(values, { resetForm }) => {
          if (!id) {
            productAdd(values);
            resetForm({});
          } else {
            productUpdate(values, id);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <StyledContent>
              <Select icon={iconBrand} onChange={handleChange} value={values.brand} name="brand">
                <option hidden value="">
                  Marka pojazdu
                </option>
                {model.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Input
                type="text"
                name="model"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.model}
                icon={iconModel}
                placeholder="Model"
              />

              <Input
                type="number"
                name="mileage"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mileage}
                icon={iconMilAge}
                placeholder="Przebieg"
              />

              <Select onChange={handleChange} value={values.fuel} icon={iconFuel} name="fuel">
                <option hidden value="">
                  Typ paliwa
                </option>
                <option value="benzyna">Benzyna</option>
                <option value="diesel">Diesel</option>
                <option value="lpg">LPG</option>
                <option value="benzyna+LPG">Benzyna+LPG</option>
                <option value="elektryczny">Elektryczny</option>
              </Select>

              <Input
                type="number"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                icon={iconYear}
                placeholder="Rocznik"
              />
              <Input
                type="number"
                name="power"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.power}
                icon={iconPower}
                placeholder="Moc"
              />

              <Select
                icon={iconGearBox}
                onChange={handleChange}
                value={values.gearbox}
                name="gearbox"
              >
                <option hidden value="">
                  Skrzynia biegów
                </option>
                <option value="manulana">Manulana</option>
                <option value="automatyczna">Automatyczna</option>
              </Select>

              <Select icon={iconDrive} onChange={handleChange} value={values.drive} name="drive">
                <option hidden value="">
                  Napęd
                </option>
                <option value="na przednie koła">Na przednie koła</option>
                <option value="na tylne koła">Na tylne koła</option>
                <option value="napęd 4x4">Napęd 4x4</option>
              </Select>

              <Select
                icon={iconCountry}
                onChange={handleChange}
                value={values.country}
                name="country"
              >
                <option hidden value="">
                  Wybierz kraj
                </option>
                {countryList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>

              <Input
                type="number"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                icon={iconPrice}
                placeholder="Cena"
              />
              <Input
                type="text"
                name="vin"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vin}
                icon={iconPrice}
                placeholder="VIN"
              />
              <Input
                type="text"
                name="regNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.regNumber}
                icon={iconPrice}
                placeholder="Nr. rej"
              />
              <TextArea
                name="description"
                onChange={handleChange}
                value={values.description}
                placeholder="Opis"
                cols="30"
                rows="7"
              ></TextArea>
            </StyledContent>
            <Button center type="submit">
              {id ? 'Zapisz zmiany' : 'Nowy produkt'}{' '}
            </Button>
          </form>
        )}
      </Formik>
    </UserFormTemplate>
  </UserTemplate>
);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;
  return {
    product,
    id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productAdd: product => dispatch(productAdd(product)),
    productUpdate: (product, id) => dispatch(productUpdate(product, id)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'products',
    },
  ]),
)(ProductAdd);
