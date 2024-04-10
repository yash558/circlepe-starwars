"use client";
import React, { useState, useEffect } from 'react';
import { getCharacters } from '../../api/starWarsApi';
import CharacterCard from './characterCard';
import { Character } from '../types';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCharacters(page);
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10)); 
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    setPage(1); 
  }, [searchQuery]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="w-full md:w-72 px-4 h-12 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md bg-blue-500 text-white ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 focus:bg-blue-600'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md bg-blue-500 text-white ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 focus:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
