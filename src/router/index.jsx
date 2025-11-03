import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/organisms/Layout';
import NotFound from '@/components/pages/NotFound';

// Lazy load all page components
const HomePage = lazy(() => import('@/pages/HomePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage'));
const OrdersPage = lazy(() => import('@/pages/OrdersPage'));
const Login = lazy(() => import('@/components/pages/Login'));
const Signup = lazy(() => import('@/components/pages/Signup'));
const Callback = lazy(() => import('@/components/pages/Callback'));
const ErrorPage = lazy(() => import('@/components/pages/ErrorPage'));
const ResetPassword = lazy(() => import('@/components/pages/ResetPassword'));
const PromptPassword = lazy(() => import('@/components/pages/PromptPassword'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Wrap each component in Suspense
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: <SuspenseWrapper><HomePage /></SuspenseWrapper>
  },
  {
    path: "cart",
    element: <SuspenseWrapper><CartPage /></SuspenseWrapper>
  },
  {
    path: "checkout",
    element: <SuspenseWrapper><CheckoutPage /></SuspenseWrapper>
  },
  {
    path: "order-confirmation/:orderId",
    element: <SuspenseWrapper><OrderConfirmationPage /></SuspenseWrapper>
  },
  {
    path: "orders",
    element: <SuspenseWrapper><OrdersPage /></SuspenseWrapper>
  },
  {
    path: "login",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>
  },
  {
    path: "signup",
    element: <SuspenseWrapper><Signup /></SuspenseWrapper>
  },
  {
    path: "callback",
    element: <SuspenseWrapper><Callback /></SuspenseWrapper>
  },
  {
    path: "error",
    element: <SuspenseWrapper><ErrorPage /></SuspenseWrapper>
  },
  {
    path: "prompt-password/:appId/:emailAddress/:provider",
    element: <SuspenseWrapper><PromptPassword /></SuspenseWrapper>
  },
  {
    path: "reset-password/:appId/:fields",
    element: <SuspenseWrapper><ResetPassword /></SuspenseWrapper>
  },
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>
  }
];

// Routes configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);