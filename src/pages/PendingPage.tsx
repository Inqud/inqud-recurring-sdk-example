import * as React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRecurringData } from 'inqud-recurring-api';
import { formatNumber } from '../utils';

interface IPendingPageProps {
  mobile?: boolean;
}

const PendingPage: React.FunctionComponent<IPendingPageProps> = () => {
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
          component={HourglassEmptyIcon}
          sx={{ fontSize: 64, color: '#FBA603' }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={2}
        paddingY={1}
        bgcolor="rgba(251, 166, 3, 0.2)"
        borderRadius="108px"
        mb={3}
      >
        <HourglassEmptyIcon sx={{ fontSize: 32, color: '#FBA603' }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: '#FBA603', ml: 1 }}
        >
          Pending
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

      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        mt={1}
      >
        Waiting for payment to be processed
      </Typography>
    </Box>
  );
};

export default PendingPage;
