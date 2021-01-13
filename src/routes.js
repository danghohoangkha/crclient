import React from 'react';

import Home from './pages/Home/index';
import Rank from "./pages/Home/rank";
import History from "./pages/Home/historyPlay";
import Login from './pages/Form/Login';
import Register from './pages/Form/Register';
import Reset from "./pages/Form/ResetPassword";
import Chess from './pages/room';
import VerifyUser from './pages/Form/VerifyUser'
import VerifyResetPassword from "./pages/Form/VerifyResetPassword";
// import ListRoom from './pages/Room/listRoom';
import ListChess from './pages/room/listChess';
import HistoryMatch from './pages/history'

import './App.css';


const routes=[
    {
        path: process.env.PUBLIC_URL+'/',
        exact: true,
        main: (history) => <Home history={history}/>
    },
    {
        path: process.env.PUBLIC_URL+'/rank',
        exact: true,
        main: (history) => <Rank history={history}/>
    },
    {
        path: process.env.PUBLIC_URL+'/history',
        exact: true,
        main: (history) => <History history={history}/>
    },
    {
        path: process.env.PUBLIC_URL+'/login',
        exact: true,
        main: () => <Login />
    },
    {
        path: process.env.PUBLIC_URL+'/register',
        exact: true,
        main: () => <Register />
    },
    {
        path: process.env.PUBLIC_URL+'/verify/:id',
        exact: true,
        main: ({match}) => <VerifyUser match ={match} />
    },
    {
        path: process.env.PUBLIC_URL+'/resetPassword/:id',
        exact: true,
        main: ({match}) => <VerifyResetPassword match = {match}/>
    },
    {
        path: process.env.PUBLIC_URL+'/resetPassword',
        exact: true,
        main: () => <Reset />
    },
    {
        path: process.env.PUBLIC_URL+'/chess/:id',
        exact: true,
        main: ({location, match, history}) => <Chess location = {location} match = {match}/>
    },
    {
        path: process.env.PUBLIC_URL+'/chessList',
        exact: true,
        main: ({match} ) => <ListChess match = {match}/>
    },
    {
        path: process.env.PUBLIC_URL+'/chessList',
        exact: true,
        main: ({match} ) => <ListChess match = {match}/>
    },
    {
        path: process.env.PUBLIC_URL+'/matchhistory/:id',
        exact: true,
        main: ({location, match}) => <HistoryMatch location={location} match = {match}/>
    }
]
export default routes;