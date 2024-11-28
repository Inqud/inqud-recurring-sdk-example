import * as React from 'react';
import { Box, Typography, SvgIcon, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRecurringData } from 'inqud-recurring-api';
import { formatNumber } from '../utils';

interface ISuccessPageProps {
  mobile?: boolean;
}

const SuccessPage: React.FunctionComponent<ISuccessPageProps> = () => {
  const { plan, disconnect } = useRecurringData();

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
          component={CheckCircleIcon}
          sx={{ fontSize: 64, color: '#077453' }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={2}
        paddingY={1}
        bgcolor="rgba(11, 119, 83, 0.2)"
        borderRadius="108px"
        mb={3}
      >
        <CheckCircleIcon sx={{ fontSize: 32, color: '#077453' }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: '#077453', ml: 1 }}
        >
          Success
        </Typography>
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        color="textPrimary"
        textAlign="center"
        mt={2}
      >
        Subscription is active
      </Typography>
      {plan && (
        <>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="textPrimary"
            textAlign="center"
            mt={2}
          >
            {formatNumber(plan.amount)} {plan.currency}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            mt={1}
          >
            You allowed spending of {formatNumber(plan.amount)} {plan.currency}
          </Typography>
        </>
      )}

      <Box mt={4} width="100%">
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => disconnect()}
        >
          Disconnect Wallet
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
