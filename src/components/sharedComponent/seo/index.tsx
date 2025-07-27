import React from 'react'
import Head from "next/head";

interface IProps {
    pageTitle: string, 
    pageDescription: string
}

const SEO = ({ pageTitle, pageDescription }: IProps) => (
    <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        ...
    </Head>
);

export default SEO; 
