import React from "react";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";
import usePersistedState from "../../utils/usePersistedState";

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const [values, setValues] = usePersistedState("persisted-language", {
    language: "en"
  });

  const handleChange = event => {
    i18n.changeLanguage(event.target.value);

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <FormControl
      style={{
        verticalAlign: "middle"
      }}
    >
      <Select
        value={values.language}
        onChange={e => handleChange(e)}
        displayEmpty
        disableUnderline
        inputProps={{
          name: "language"
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <MenuItem value="en">🇺🇸</MenuItem>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <MenuItem value="cs">🇨🇿</MenuItem>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <MenuItem value="vi">🇻🇳</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageMenu;
