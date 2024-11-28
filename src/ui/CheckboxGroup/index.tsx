import * as React from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { BlockchainOption } from "../../models";

interface ICheckboxGroupProps {
  networks: BlockchainOption[];
  selectedNetwork?: BlockchainOption;
  onChange?: (network: BlockchainOption) => void;
  radio?: boolean;
  className?: string;
}

const CheckboxGroup: React.FunctionComponent<ICheckboxGroupProps> = ({
     networks,
     selectedNetwork,
     onChange = () => {},
     radio = false,
     className,
   }) => {
  const handleChange = (value: BlockchainOption) => () => {
    onChange(value);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      className={className}
    >
      {networks.map((network) => (
        <FormControlLabel
          key={network.network}
          control={
            <Checkbox
              checked={selectedNetwork?.network === network.network}
              onChange={handleChange(network)}
              value={network.network}
            />
          }
          label={
            network?.network.length > 3
              ? network?.network.charAt(0)?.toUpperCase() + network?.network.slice(1)?.toLowerCase()
              : network.network
          }
        />
      ))}
    </Box>
  );
};

export default CheckboxGroup;
