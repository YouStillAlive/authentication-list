import AuthenticationList from './pages/authenticationList';
import Auth from './pages/auth.js';
import Registration from './pages/registration.js';
import { DASHBOARD_ROUTE, REGISTRATION_ROUTE, DEFAULT_ROUTE } from './utils/consts.js';

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: AuthenticationList
    },
]

export const publicRoutes = [
    {
        path: DEFAULT_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
]