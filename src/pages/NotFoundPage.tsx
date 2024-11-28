import * as React from 'react';
import { Box, Typography, Card } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface INotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
    >
      <Card
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
        }}
      >
        <ErrorOutlineIcon
          sx={{ fontSize: 64, color: '#F45C3B', marginBottom: 2 }}
        />
        <Typography variant="h6" fontWeight="bold" color="textPrimary">
          Page not found
        </Typography>
      </Card>
    </Box>
  );
};

export default NotFoundPage;
