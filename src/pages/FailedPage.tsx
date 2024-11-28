import * as React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useRecurringData } from 'inqud-recurring-api';
import { formatNumber } from '../utils';

interface IFailedCardProps {}

const FailedCard: React.FunctionComponent<IFailedCardProps> = () => {
  const { plan, error } = useRecurringData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding={2}
    >
      <Box mb={3}>
        <SvgIcon
          component={ErrorOutlineIcon}
          color="error"
          sx={{ fontSize: 64 }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={2}
        paddingY={1}
        bgcolor="rgba(244, 92, 59, 0.2)"
        borderRadius="108px"
        mb={3}
      >
        <WarningAmberIcon sx={{ fontSize: 32, color: '#F45C3B' }} />
        <Typography variant="h6" fontWeight="bold" color="error" ml={1}>
          Failed
        </Typography>
      </Box>

      <Typography
        variant="body1"
        fontWeight="bold"
        color="error"
        textAlign="center"
        mt={2}
      >
        {error || 'An unknown error occurred'}
      </Typography>

      {plan && (
        <>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="textPrimary"
            mt={3}
          >
            {formatNumber(plan.amount)} {plan.currency}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            mt={1}
          >
            Please contact support for additional information.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default FailedCard;
