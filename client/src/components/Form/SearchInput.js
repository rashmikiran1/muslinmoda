import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/Search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search for women products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
      </form>
    </div>
  );
};

export default SearchInput;