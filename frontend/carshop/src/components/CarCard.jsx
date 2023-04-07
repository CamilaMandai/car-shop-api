import React from 'react';

export default function carCard({ car }) {
  return (
    <div>
      <p>Modelo: {car.model}</p>
      <p>Ano: {car.year}</p>
      <p>Cor: {car.color}</p>
      <p>Preço: {car.buyValue}</p>
    </div>
  );
}
