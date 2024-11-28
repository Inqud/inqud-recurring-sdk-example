import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { RecurringState } from '../models';
import { RecurringDataProvider, useRecurringData } from 'inqud-recurring-api';
import PaymentPage from './PaymentPage.tsx';
import ConnectWalletPage from './ConnectWalletPage.tsx';
import SuccessPage from './SucessPage';
import FailedPage from './FailedPage';
import PendingPage from './PendingPage';
import CancelledPage from './CancelledPage';

const LoadingOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      borderRadius: '16px',
    }}
  >
    <CircularProgress />
  </Box>
);

const RecurringMainPage: React.FC<{}> = () => {
  const { state, loading } = useRecurringData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      py={3}
      minHeight="100vh"
    >
      <Box display="flex" flexDirection="column" my="auto">
        <Box position="relative">
          {loading && <LoadingOverlay />}
          <Box
            sx={{
              width: 423,
              minWidth: 423,
              minHeight: 300,
              borderRadius: '16px',
              position: 'relative',
            }}
          >
            {
              {
                [RecurringState.notConnected]: <ConnectWalletPage />,
                [RecurringState.connected]: <PaymentPage />,
                [RecurringState.noAuthSubscription]: <PaymentPage />,
                [RecurringState.authNoSubscription]: <PaymentPage />,
                [RecurringState.active]: <SuccessPage />,
                [RecurringState.failed]: <FailedPage />,
                [RecurringState.pending]: <PendingPage />,
                [RecurringState.cancelled]: <CancelledPage />,
              }[state as number]
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const RecurringPageWithContext: React.FC<{}> = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const clientOrderId = query.get('orderId');

  return (
    <RecurringDataProvider
      planId={id} // recurring plan ID
      clientOrderId={clientOrderId} // client order ID
      projectId="TODO" // your wallet connect project ID
      baseUrl="https://api.inqud.com/"
    >
      <RecurringMainPage />
    </RecurringDataProvider>
  );
};

export default RecurringPageWithContext;
