import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecurringPage from './RecurringMainPage.tsx';
import NotFoundPage from './NotFoundPage.tsx';

const router = createBrowserRouter([
  {
    path: '/plans/:id',
    element: <RecurringPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const MainPage: React.FC = () => {
  return <RouterProvider router={router} />;
};
