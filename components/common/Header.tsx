import React from 'react';
import Head from "next/head";

interface HeaderProps {
    title?: string | undefined
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <h1 className="text-5xl w-8/12 sm:text-6xl sm:w-10/12 text-center  text-green-400 font-semibold text-opacity-90">
                {title}
            </h1>
        </>
    )
}