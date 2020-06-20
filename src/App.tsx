import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { connect } from "react-redux";
import {simpleAction} from './reducers/simpleReducer'
import {loadAnime} from './reducers/animeReducer'
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

  const [searchString, setSearchString] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  function simpleAction() {
    props.loadAnime(searchString, 20, 1);
  }

  useEffect(() => {
    if (searchString) simpleAction();
  }, [searchString]);

  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchString(inputText);
  }

  return(
  <div className="list-container">
    <form id="searchForm" onSubmit={handleSubmit} className="flex left">
        <input value={inputText} onChange={e=>setInputText(e.target.value)} type="search"/>
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
        {props?.animeReducer?.results?.map(char=><CharacterCard {...char}/>)}
      </div>
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


