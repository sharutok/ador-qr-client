import Cookies from "universal-cookie";
import React from 'react'
const cookies = new Cookies()

let cookieName = ["emp_code"]

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        cookies.set(x, cookieValues[i], {
            path: "/", expires: new Date(Date.now() + 28800000)
        },)
    })
}

export const getCookies = () => {
    return cookieName.map(x => {
        return cookies.get(x)
    })
}

export const deleteCookies = () => {
    cookieName.map(x => {
        return cookies.remove(x, { path: "/" })
    })
}

function CookiesS() {
    return true
}

export default CookiesS