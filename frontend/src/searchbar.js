import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { SiteContext } from "./context";

const SearchBar = () => {
  const { userState } = useContext(SiteContext);
  const [params, setParams] = useState({
    country: "",
    service: "",
    type: "",
    keyword: "",
    page: "1",
    output_language: "en",
    language: "en",
  });
  console.log(params)
  const clearChanges = (e) => {
    setParams({
      country: "",
      service: "",
      type: "",
      keyword: "",
      page: "1",
      output_language: "en",
      language: "en",
    });
  };
  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.id]: e.target.value,
    });
  };
  const handleSearch = (e) => {
    if (!params.country || !params.service || !params.type || !params.keyword) console.log("insufficient information")
  }
  return (
    <>
      <Row>
        <SearchBox
          id="keyword"
          type="text"
          value={params.keyword}
          onChange={handleChange}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {handleSearch(params)}
          }}
        ></SearchBox>
        <Button id="search" onClick={handleSearch(params)}></Button>
        <Button id="clear" onClick={clearChanges}></Button>

      </Row>
      <Row>
        <div>
          <Select id="type" value={params.type} onChange={handleChange}>
            <Item key={"movie"}>movie</Item>
            <Item key={"series"}>series</Item>
          </Select>
          <Select id="country" value={params.country} onChange={handleChange}>
            {COUNTRIES.map((country) => {
              return (
                <Item key={country.code} value={country.code}>
                  {country.country}
                </Item>
              );
            })}
          </Select>
          <Select id="service" value={params.service} onChange={handleChange}>
            {SERVICES.filter((service) => {
              if (Object.values(service)[0].includes(params.country)) {
                return Object.keys(service)[0];
              }
            }).map((e) => {
              return (
                <Item
                  key={Object.keys(e).toString()}
                  value={Object.keys(e).toString()}
                >
                  {Object.keys(e).toString()}
                </Item>
              );
            })}
          </Select>
        </div>
      </Row>
    </>
  );
};
const Row = styled.div``;
const SearchBox = styled.input``;
const Button = styled.button``;
const Select = styled.select``;
const Item = styled.option``;

export default SearchBar;
