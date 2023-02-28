import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import { Container } from "reactstrap";


import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function PoketmonDropdown(props) {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>버튼 Dropdown</DropdownToggle>
          <DropdownMenu>
              <DropdownItem header>헤더</DropdownItem>
          <DropdownItem disabled>비활성화 버튼</DropdownItem>
              <a href="http:anerim.tistory.com">
                  <DropdownItem>뚝딱 티스토리로 이동</DropdownItem>
              </a>
              <DropdownItem onClick={e => alert('Alert 버튼')}>
                  Alert 버튼
              </DropdownItem>
          </DropdownMenu>
      </ButtonDropdown>
  )
}


function PokeMonList(){

  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100').then(response => {
      setPokemonList(response.data.results);
    });
  }, []);

  return <>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label htmlFor="pokemon">Favorite Pokemon:</label>
          <select id="pokemon" name="pokemon">
            <option value="">Select a Pokemon...</option>
            {pokemonList.map(pokemon => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      </>




}

function App() {
  const [firstName, setFirstName] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.checkValidity() === false) {
      console.log("Not submitted");
    } else {
      console.log("Submitted!");
    }

    e.target.classList.add("was-validated");
  }

  return (
    <Container>
      <form class="p-4 needs-validation" noValidate onSubmit={handleSubmit}>
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom01">First name</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              placeholder="First name"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);

                const found = e.target.value.match(/\d+/) || [];
                console.log(found);
                if (found.length) {
                  e.target.classList.add("is-invalid");
                  e.target.classList.remove("is-valid");
                  e.target.setCustomValidity("Not valid");
                } else {
                  e.target.classList.remove("is-invalid");
                  e.target.classList.add("is-valid");
                  e.target.setCustomValidity("");
                }

                console.log(e.target.checkValidity());
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">Please provide a name</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom02"
              placeholder="Last name"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom03">Phone</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              placeholder="Phone Number"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          
        </div>

        <div class="col-md-5 mb-3">
            <label htmlFor="validationCustom04">Address</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom04"
              placeholder="Address"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label htmlFor="validationCustom05">City</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom05"
              placeholder="City"
              required
            />
            <div class="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div class="col-md-3 mb-3">
            <label htmlFor="validationCustom06">Province</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom06"
              placeholder="Province"
              required
            />
            <div class="invalid-feedback">Please provide a valid province.</div>
          </div>
          <div class="col-md-3 mb-3">
            <label htmlFor="validationCustom07">Zip</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom07"
              placeholder="Zip"
              required
            />
            <div class="invalid-feedback">Please provide a valid zip.</div>
          </div>
        </div>

        <div>
          <PokeMonList></PokeMonList>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required
            />
            <label class="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">
          Submit form
        </button>
      </form>
    </Container>
  );
}

export default App;
