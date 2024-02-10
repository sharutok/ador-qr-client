import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage'
import ErrorPage404NotFound from './ErrorPage404NotFound';
import HomePage from './HomePage/HomePage';
import SharePage from './ClientShare/SharePage';
function Path() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/share' element={<SharePage />} />
                <Route path='*' element={<ErrorPage404NotFound />} />
            </Routes>
        </Router>
    )
}

export default Path