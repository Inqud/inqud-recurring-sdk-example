import React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  useRecurringData,
  ConnectButtonComponent,
} from 'inqud-recurring-api';
import { isEmpty, values } from 'lodash';
import CheckboxGroup from "../ui/CheckboxGroup";
import CustomSelect from "../ui/Select";

interface IPlanPageProps {
  mobile?: boolean;
  className?: string;
}

const ConnectWalletPage: React.FunctionComponent<IPlanPageProps> = ({
  mobile = false,
  className,
}) => {
  const {
    setCurrency,
    setSelectedNetwork,
    selectedNetwork,
    currency,
    plan,
    loading,
    error,
    networks,
  } = useRecurringData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      className={className}
      padding={2}
    >
      {/* Select Network */}
      <Box display="flex" flexDirection="column" mb={mobile ? 4 : 6}>
        <Typography
          variant="caption"
          fontWeight="bold"
          color="textSecondary"
          mb={1}
        >
          Select network
        </Typography>
        <Box>
          <CheckboxGroup
            networks={values(networks)}
            radio
            selectedNetwork={selectedNetwork}
            onChange={setSelectedNetwork}
          />
        </Box>
      </Box>

      {/* Select Currency */}
      {selectedNetwork && (
        <Box display="flex" flexDirection="column" mb={3}>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="textSecondary"
            mb={1}
          >
            Select currency
          </Typography>
          <CustomSelect
            currencies={selectedNetwork?.currencies}
            selectedCurrency={currency}
            onSelect={setCurrency}
            disabled={!!error}
          />
        </Box>
      )}

      {/* No Active Payment Methods */}
      {plan && isEmpty(plan?.chains) && (
        <Typography variant="body2" color="textSecondary">
          No active payment methods
        </Typography>
      )}

      {/* Connect Wallet Button */}
      <Box mt="auto">
        <ConnectButtonComponent.Custom>
          {({ openConnectModal }: any) => (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={openConnectModal}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Connect Wallet'}
            </Button>
          )}
        </ConnectButtonComponent.Custom>
      </Box>
    </Box>
  );
};

export default ConnectWalletPage;
