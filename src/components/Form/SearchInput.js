import React from 'react';
import { useSearch } from '../../context/Search';
import axios from "../../axiosInstance.js"
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.keyword) {
      return console.log("Please enter a search term");
    }
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          id="formGroupExampleInput"
        /> <button className="btn " type="submit">
        <AiOutlineSearch type="submit"/>
      </button>
       
      </form>
    </div>
  );
};

export default SearchInput;
