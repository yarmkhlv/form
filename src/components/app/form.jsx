import { useState, useEffect } from "react";

import "./../../styles/form.css";

const defaultValueTextPassInput = "";
const radioBtns = [
  { id: "radio1", name: "radioSelection", value: "Radio selection 1" },
  { id: "radio2", name: "radioSelection", value: "Radio selection 2" },
  { id: "radio3", name: "radioSelection", value: "Radio selection 3" },
];

export function Form() {
  const [username, setUsername] = useState(defaultValueTextPassInput);
  const [password, setPassword] = useState(defaultValueTextPassInput);
  const [inputTextLabel, setInputTextLabel] = useState(
    defaultValueTextPassInput
  );
  const [remember, setRemember] = useState(false);
  const [radioSelection, setRadioSelection] = useState("Radio selection 1");

  const [validate, setValidate] = useState(true);

  useEffect(() => {
    setValidate(() => validationForms());
  }, [username, password, inputTextLabel]);

  const renderRadio = radioBtns.map((elem) => (
    <div className="form__block-radio" key={elem.id}>
      <input
        onChange={(event) => setRadioSelection(event.currentTarget.value)}
        className="form__radio-selection"
        id={elem.id}
        name={elem.name}
        value={elem.value}
        type="radio"
        checked={radioSelection === elem.value}
      />
      <label className="form__radio-label" htmlFor={elem.id}>
        {elem.value}
      </label>
    </div>
  ));

  function validationForms() {
    if (
      username.length > 0 &&
      password.length > 4 &&
      password.length < 12 &&
      inputTextLabel.length > 0
    ) {
      return false;
    }
    return true;
  }

  function resetForms() {
    setUsername(defaultValueTextPassInput);
    setPassword(defaultValueTextPassInput);
    setInputTextLabel(defaultValueTextPassInput);
    setRemember(false);
    setRadioSelection("Radio selection 1");
  }

  function formSubmitNext(event) {
    event.preventDefault();
    const dataObj = {
      username,
      password,
      inputTextLabel,
      remember,
      radioSelection,
    };
    alert(JSON.stringify(dataObj));
    resetForms();
  }

  return (
    <form>
      <div className="form__block">
        <label htmlFor="username" className="form__label">
          Username
        </label>
        <input
          onInput={(event) => {
            setUsername(event.currentTarget.value);
          }}
          value={username}
          id="username"
          placeholder="Enter username"
          className="form__input"
          type="text"
        />
      </div>
      <div className="form__block">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          onInput={(event) => {
            setPassword(event.currentTarget.value);
          }}
          value={password}
          id="password"
          placeholder="Enter password"
          className="form__input"
          type="password"
        />
        {password.length >= 4 && password.length <= 12 ? null : (
          <p className="form__pass-warning">
            Your password is between 4 and 12 characters
          </p>
        )}
      </div>
      <div className="form__block">
        <label htmlFor="textlabel" className="form__label">
          Input Text Label
        </label>
        <input
          onInput={(event) => {
            setInputTextLabel(event.currentTarget.value);
          }}
          value={inputTextLabel}
          id="textlabel"
          placeholder="Enter text label"
          className="form__input"
          type="text"
        />
      </div>
      <div className="form__block__checkbox">
        <input
          onChange={(event) => {
            setRemember(event.currentTarget.checked);
          }}
          checked={remember}
          className="form__checkbox"
          type="checkbox"
          id="remember"
        />
        <label htmlFor="remember">Remember me</label>
      </div>

      <div className="form__block-toggle">
        <label className="switch">
          <input className="switch__input" type="checkbox" />
          <span className="swich__slider" />
        </label>
      </div>

      <div>
        <fieldset>{renderRadio}</fieldset>
      </div>

      <div className="form__block-dropdown">Dropdown</div>

      <div className="form__btn-block">
        <button className="form__btn-cancel" type="button">
          Cancel
        </button>
        <button
          onClick={(event) => formSubmitNext(event)}
          disabled={validate}
          className="form__btn-submit"
          type="button"
        >
          Next
        </button>
      </div>
    </form>
  );
}
