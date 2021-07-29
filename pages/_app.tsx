
import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import '../styles/globals.css'

interface IProps {
    Component: FunctionComponent
    pageProps: any
}

export default function App( {Component, pageProps}: IProps) {
    
    const ContextProvider: FunctionComponent = ({ children }) => {

        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }

    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    )
}

