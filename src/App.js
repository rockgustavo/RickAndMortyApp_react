import { useState, useEffect } from 'react';
import api from './services/api';

import { Dropdown } from 'primereact/dropdown';
import { Carousel } from 'primereact/carousel';

import './App.css';
import icone from './images/rick-and-morty.png';

function App() {
  const [character, setCharacter] = useState('');
  const [characterComplete, setCharacterComplete] = useState('');
  const [characteres, setCharacteres] = useState([]);
  const [detalhe, setDetalhe] = useState(false);
  const [loading, setLoading] = useState(false);


  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  useEffect(() => {
    setDetalhe(false);
    setCharacterComplete('');
  }, [character]);

  useEffect(() => {
    loadDados();
  }, []);

  useEffect(() => {
    console.log(characterComplete)

  }, [characterComplete]);

  async function loadDados() {
    const response = await api
      .get("/character")
      .then((response) => response.data)
      .catch((err) => {
        console.error("Lista vazia!");
      });
    setCharacteres(response);
  }

  async function loadSelectComplete(id) {
    const response = await api
      .get("/characterComplete/" + id)
      .then((response) => response.data)
      .catch((err) => {
        console.error("Lista vazia!");
      });
    setCharacterComplete(response);
    setLoading(false);
    setDetalhe(true);
  }

  const detalheMore = () => {
    setLoading(true);
    loadSelectComplete(character.id);
  }

  const productTemplate = (episode) => {
    return (
      <div className='episode'>
        <p className="mb-1">ID: {episode.id}</p>
        <p className="mt-0 mb-3">Name: {episode.name}</p>
        <p className="mt-0 mb-3">Data on air: {episode.air_date}</p>
        <p className="mt-0 mb-3">Episódio: {episode.episode}</p>
        <p className="mt-0 mb-3 url">URL: {episode.url}</p>
      </div>
    );
  }


  return (
    <div className="container">
      <header>
        <img src={icone} alt="logo" />
      </header>
      <main>
        <Dropdown value={character} options={characteres} onChange={(e) => setCharacter(e.value)} optionLabel="name" placeholder="Escolha um personagem" />
        {character &&
          <div>
            <img src={character.image} alt={character.name} />
            <div className='detail'>
              <p>Character: <strong>{character.name}</strong> </p>
              <p>Status: <strong>{character.status}</strong></p>
              <p>Created: <strong>{character.created}</strong></p>
            </div>
            <button onClick={detalheMore}> Detalhes</button>
          </div>
        }
        {loading &&
          <span>Carregando detalhes...</span>
        }
        {detalhe &&
          <div className="card">
            <Carousel value={characterComplete.episodes} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate} header={<h3>Episódios que {character.name} participou</h3>} />
          </div>
        }
      </main>
    </div>
  );
}

export default App;
