import * as React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRecurringData } from 'inqud-recurring-api';
import { formatNumber } from '../utils';

interface ICancelledPageProps {
  mobile?: boolean;
}

const CancelledPage: React.FunctionComponent<ICancelledPageProps> = () => {
  const { plan } = useRecurringData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding={2}
    >
      <Box mb={2}>
        <SvgIcon
          component={CancelIcon}
          sx={{ fontSize: 64, color: '#F45C3B' }}
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
        <CancelIcon sx={{ fontSize: 32, color: '#F45C3B' }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: '#F45C3B', ml: 1 }}
        >
          Cancelled
        </Typography>
      </Box>

      {plan && (
        <Typography
          variant="h5"
          fontWeight="bold"
          color="textPrimary"
          textAlign="center"
          mt={2}
        >
          {formatNumber(plan.amount)} {plan.currency}
        </Typography>
      )}

      {/* Cancellation Message */}
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        mt={1}
      >
        Subscription cancelled.
      </Typography>
    </Box>
  );
};

export default CancelledPage;
