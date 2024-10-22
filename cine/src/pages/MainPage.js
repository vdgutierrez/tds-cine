import React from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Cartelera from '../components/Cartelera/Cartelera';

const data = [
  {
    title: "Movie Title 1",
    text: "This is a longer card with supporting text below...",
    footer: "Someone famous",
    source: "Source Title 1",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 2",
    text: "Another description for this card...",
    footer: "Another famous person",
    source: "Source Title 2",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },
  {
    title: "Movie Title 1",
    text: "This is a longer card with supporting text below...",
    footer: "Someone famous",
    source: "Source Title 1",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 2",
    text: "Another description for this card...",
    footer: "Another famous person",
    source: "Source Title 2",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },  {
    title: "Movie Title 1",
    text: "This is a longer card with supporting text below...",
    footer: "Someone famous",
    source: "Source Title 1",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 2",
    text: "Another description for this card...",
    footer: "Another famous person",
    source: "Source Title 2",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },  {
    title: "Movie Title 1",
    text: "This is a longer card with supporting text below...",
    footer: "Someone famous",
    source: "Source Title 1",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 2",
    text: "Another description for this card...",
    footer: "Another famous person",
    source: "Source Title 2",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },
];

const MainPage = () => {
  return (
    <div>
      <br />
      <Cartelera data={data}/>
      <br />

      <br />
    </div>
  );
};

export default MainPage;
