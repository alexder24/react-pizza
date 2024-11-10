import { useState, createContext } from 'react';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const SearchContext = createContext();

export default function Root() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
