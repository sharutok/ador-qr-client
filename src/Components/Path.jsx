import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage'
import ErrorPage404NotFound from './ErrorPage404NotFound';
import HomePage from './HomePage/HomePage';
import SharePage from './ClientShare/SharePage';
import { getCookies } from '../HelperComponents/CookiesS';

function Path() {
    if (window.location.pathname.includes("/share")) {
        return (
            <Router>
                <Routes>
                    <Route path='/share/:id' element={<SharePage />} />
                </Routes>
            </Router>
        )
    }

    if (!getCookies()[0]) {
        return <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<LoginPage />} />
                </Routes>
            </Router>
        </>
    } else {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='*' element={<ErrorPage404NotFound />} />
                </Routes>
            </Router>
        )
    }

}

export default Path