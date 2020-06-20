import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {loadAnime} from '../../reducers/animeReducer'
import usePagination from '../../helpers/usePagination'
import './App.scss'

export default function App() {
  return (
    <div className="App">
      <ListPage/>
    </div>
  );
}

const ListPage= connect(
    (state) => ({
        ...state,
      }),
      {loadAnime}
)(List);

function List({...props}){
  const {
  pageSize,
  setPageSize, 
  currentPage, 
  setCurrentPage,
  goLeft, 
  goRight,
  pages,
} = usePagination({})

  const [searchString, setSearchString] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  function simpleAction() {
    props.loadAnime(searchString, pageSize, currentPage);
  }

  useEffect(() => {
    if (searchString) simpleAction();
  }, [searchString, pageSize, currentPage]);

  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchString(inputText);
  }

  return(
  <div className="list-container">
    <form id="searchForm" onSubmit={handleSubmit} className="flex left">
        <input placeholder="Enter your query" value={inputText} onChange={e=>setInputText(e.target.value)} type="search"/>
        <button>
          Go
        </button>
      </form>
      <div className="loading">
        {props.animeReducer?.loadingUrl && <>
        <span className="loading--heading">Requesting:</span>
        <span className="loading--url">{props.animeReducer.loadingUrl}</span>
        </>}
      </div>
      <div className="card-container">
        {props?.animeReducer?.results?.map(char=><CharacterCard key={char.title} {...char}/>)}
      </div>
      {props.animeReducer?.results ? <Pagination
        pages={pages}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> : <div/>}
  </div>)
}

function CharacterCard({...props}){
  return(
    <div className="card" style={{backgroundImage:`url(${props.image_url})`}}>
      <div className="card--name">
        {props.title}
      </div>
    </div>
  )
}

interface pagination{
  pageSize?: number;
  setPageSize ?: (id:number)=> void;
  currentPage: number;
  setCurrentPage: (id: number)=> void;
  goLeft ?: ()=>void;
  goRight ?: ()=>void;
  pages : number[];
}
const Pagination: React.FC<pagination> = ({ pageSize = 10, setPageSize = null, currentPage = 1, setCurrentPage , goLeft = null, goRight = null, pages = [] }) => {
  return (
    <div className="flex pagination-container">
      <ul className="pages">
        {pages.map(p=>
          <li key={p} onClick={e=>setCurrentPage(p)} className={`page-number ${currentPage === p ? 'active' : ''}`}>{p}</li>
        )}
      </ul>
    </div>
  )
}


