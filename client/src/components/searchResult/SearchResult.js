import "./searchResult.css";

const SearchResult = ({ searchResult, click }) => {
  return <button onClick={click}>{searchResult}</button>;
};

export default SearchResult;
