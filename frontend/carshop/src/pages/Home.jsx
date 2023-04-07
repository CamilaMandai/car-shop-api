import React, { useState, useEffect } from 'react';
import { requestData } from '../services/request';
import CarCard from '../components/CarCard';

const Home = () => {
  const [cars, setCars] = useState([]);

  const getCars = async (endpoint) => requestData(endpoint)
    .then((response) => setCars(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    getCars('/cars');
  });

  return (
    <div>
    {
      cars.map((car) => <CarCard key={car.model} car={car} />)
    }
    </div>
  );
};

export default Home;