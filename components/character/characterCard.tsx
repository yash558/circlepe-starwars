import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import Modal from './Modal';

const useCharacterDetails = (character: Character, modalOpen: boolean) => {
  const [characterDetails, setCharacterDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(character.homeworld);
        const data = await response.json();
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError('Failed to fetch character details.');
        setLoading(false);
      }
    };

    if (modalOpen) {
      setLoading(true);
      fetchCharacterDetails();
    }
  }, [character.homeworld, modalOpen]);

  return { characterDetails, loading, error };
};

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { characterDetails, loading, error } = useCharacterDetails(character, modalOpen);

  const closeModal = () => {
    setModalOpen(false);
  };

  const speciesColor = character.species[0] === 'D' ? 'bg-blue-600' : 'bg-green-600';


  return (
    <div>
      <div className={`${speciesColor} p-4 rounded-md hover:bg-gray-700 transition duration-300 cursor-pointer`} onClick={() => setModalOpen(true)}>
        <img src={`https://picsum.photos/200/300?random=${Math.random()}`} alt="Character" className="w-full h-64 rounded-md" />
        <div className="text-white text-lg font-semibold mt-2">{character.name}</div>
      </div>
      {modalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-black text-3xl font-semibold mb-4">{character.name}</h2>
          {loading ? (
            <div className="text-black">Loading...</div>
          ) : error ? (
            <div className="text-black">Error: {error}</div>
          ) : (
            <div className="text-black">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Height:</p>
                  <p>{character.height} meters</p>
                </div>
                <div>
                  <p className="font-semibold">Mass:</p>
                  <p>{character.mass} kg</p>
                </div>
                <div>
                  <p className="font-semibold">Birth Year:</p>
                  <p>{character.birth_year}</p>
                </div>
                <div>
                  <p className="font-semibold">Added to API:</p>
                  <p>{new Date(character.created).toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                  <p className="font-semibold">Number of Films:</p>
                  <p>{character.films.length}</p>
                </div>
                <div>
                  <p className="font-semibold">Homeworld:</p>
                  <p>{characterDetails?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Terrain:</p>
                  <p>{characterDetails?.terrain}</p>
                </div>
                <div>
                  <p className="font-semibold">Climate:</p>
                  <p>{characterDetails?.climate}</p>
                </div>
                <div>
                  <p className="font-semibold">Residents:</p>
                  <p>{characterDetails?.residents.length}</p>
                </div>
                <div>
                  <p className="font-semibold">Species:</p>                 
                  <p>{character.species.length > 0 ? character.species : 'Unknown'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

    </div>
  );
};

export default CharacterCard;
