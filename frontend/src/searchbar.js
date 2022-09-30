import { useEffect, useState } from "react";
import styled from "styled-components";



const Searchbar = () => {
  let params = {country: null, service: null, type: null, keyword: null, page: '1', output_language: 'en', language: 'en'}

  useEffect(() => {
    fetch('/countriesDb')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  })
  return (
    <>
      <Row>
        <SearchBox
          type = "text"
          value = ""
          onChange = {(ev) => setSearch(ev.target.value)}
          onKeyDown = {(ev) => {
            // if (ev.key === "Enter") {handleSelect(search);}
          }}>
        </SearchBox>
        <Button onClick={() => setSearch("")}></Button>
      </Row>
      <Row>
          <div>
            <Select id="type" value={"type"} onChange={params.type = e.target.value}>
              <Item value="movie">movie</Item>
              <Item value="series">series</Item>
            </Select>
            <Select id="country" value={"country"} onChange={params.country = value}>
              {/* <Item value= */}

            </Select>
            <Select id="service" value={"service"}> onChange={params.service = value}
            
            </Select>
          </div>

      </Row>
    </>
  )

}
const Row = styled.div`
`;
const SearchBox = styled.input`
`;
const Button = styled.button`
`;
const Select = styled.select`
`
const Item = styled.option`
`;

export default Searchbar;
