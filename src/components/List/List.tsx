import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAnime } from "../../reducers/animeReducer";
import usePagination from "../../helpers/usePagination";
import {Pagination} from '../Pagination'

export default connect(
  (state) => ({
    ...state,
  }),
  { loadAnime }
)(List);

function List({ ...props }) {
  const {
    pageSize,
    currentPage,
    setCurrentPage,
    pages,
  } = usePagination({});

  const [searchString, setSearchString] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  function simpleAction() {
    props.loadAnime(searchString, pageSize, currentPage);
  }

  useEffect(() => {
    if (searchString) simpleAction();
  }, [searchString, pageSize, currentPage, simpleAction]);

  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchString(inputText);
  }

  return (
    <div className="list-container">
      <form id="searchForm" onSubmit={handleSubmit} className="flex left">
        <input
          placeholder="Enter your query"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="search"
        />
        <button>Go</button>
      </form>
      <div className="loading">
        {props.animeReducer?.loadingUrl && (
          <>
            <span className="loading--heading">Requesting:</span>
            <span className="loading--url">
              {props.animeReducer.loadingUrl}
            </span>
          </>
        )}
      </div>
      <div className="card-container">
        {props?.animeReducer?.results?.map((char) => (
          <CharacterCard key={char.title} {...char} />
        ))}
      </div>
      {props.animeReducer?.results ? (
        <Pagination
          pages={pages}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

function CharacterCard({ ...props }) {
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${props.image_url})` }}
    >
      <div className="card--name">{props.title}</div>
    </div>
  );
}
