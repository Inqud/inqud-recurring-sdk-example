import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { formatNumber, shortenWithDotsBetween } from '../utils';
import { useRecurringData } from 'inqud-recurring-api';
import {values} from "lodash";
import CheckboxGroup from "../ui/CheckboxGroup";
import Select from "../ui/Select";
import CustomSelect from "../ui/Select";

interface IConnectPageProps {
  address?: string;
  className?: string;
}

const PaymentPage: React.FunctionComponent<IConnectPageProps> = ({
  className,
}) => {
  const {
    setCurrency,
    setSelectedNetwork,
    noNetwork,
    selectedNetwork,
    currency,
    plan,
    address,
    disconnect,
    error,
    setLimit,
    handlePayClick,
    isSubscription,
    duration,
    setDuration,
    networks,
    balanceData,
    limitFormatted,
    noBalance,
  } = useRecurringData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      className={className}
    >
      <Box mb={2}>
        {address && (
          <Box mb={2}>
            <Typography variant="subtitle2">Wallet address</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              border="1px solid rgba(0, 0, 0, 0.2)"
              borderRadius={1}
              padding={1}
            >
              <Typography>{shortenWithDotsBetween(address, 20)}</Typography>
              <Button color="success" onClick={disconnect}>
                Disconnect
              </Button>
            </Box>
          </Box>
        )}

        {noNetwork && plan && (
          <Box
            display="flex"
            alignItems="center"
            bgcolor="rgba(244, 105, 59, 0.2)"
            borderRadius={1}
            padding={1}
            mt={2}
            mb={2}
          >
            <InfoIcon fontSize="small" style={{ color: '#F4693B' }} />
            <Typography variant="body2" color="error" ml={1}>
              Network is not supported
            </Typography>
          </Box>
        )}
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle2" gutterBottom>
          Select network
        </Typography>
        <CheckboxGroup
          networks={values(networks)}
          radio
          selectedNetwork={selectedNetwork}
          onChange={setSelectedNetwork}
        />
      </Box>

      {currency && (
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2">Your wallet balance</Typography>
            <Typography variant="body2">
              {balanceData?.formatted
                ? `${balanceData.formatted} ${currency?.currency}`
                : ''}
            </Typography>
          </Box>
        </Box>
      )}

      {plan && selectedNetwork && (
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

      {noBalance && (
        <Box
          display="flex"
          alignItems="center"
          bgcolor="rgba(244, 105, 59, 0.2)"
          borderRadius={1}
          padding={1}
          mt={2}
          mb={2}
        >
          <InfoIcon fontSize="small" style={{ color: '#F4693B' }} />
          <Typography variant="body2" color="error" ml={1}>
            Your balance is not enough
          </Typography>
        </Box>
      )}

      {isSubscription && (
        <>
          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={7}>
              <TextField
                label={`Spending limit ${
                  currency?.currency ? `(${currency.currency})` : ''
                }`}
                value={isSubscription ? limitFormatted : '∞'}
                onChange={(e) => setLimit(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>

          <Box mb={2}>
            <Typography variant="subtitle2">Total amount to pay</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h4">
                ~
                {formatNumber(
                  plan?.amount * (currency?.rate || 0),
                  currency?.decimals
                )}
              </Typography>
              <Typography variant="h6" ml={1}>
                {currency?.currency}
              </Typography>
              <Tooltip
                title="The final amount may be subject to slight variations."
                arrow
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </>
      )}

      <Box mt="auto" pt={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={(!currency && !selectedNetwork) || noBalance}
          onClick={handlePayClick}
          sx={{ height: '48px' }}
        >
          {isSubscription ? 'Pay and Subscribe' : 'Allow Spending'}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
