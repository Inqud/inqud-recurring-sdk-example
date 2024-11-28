import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { BlockchainOptionCurrency } from "../../models";

interface Props {
  selectedCurrency?: BlockchainOptionCurrency;
  currencies: BlockchainOptionCurrency[];
  onSelect?: (currency: BlockchainOptionCurrency) => void;
  disabled?: boolean;
  label?: string;
}

const CustomSelect: React.FC<Props> = ({
     selectedCurrency,
     currencies,
     onSelect = () => {},
     disabled = false,
     label = "Select Currency",
   }) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selected = currencies.find((currency) => currency.currency === event.target.value);
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <Box>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedCurrency?.currency || ""}
          onChange={handleChange}
          label={label}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.currency} value={currency.currency}>
              {currency.currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
