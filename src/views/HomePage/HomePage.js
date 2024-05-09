import React from "react";
import routes from "../../routes";
import { useEffect } from "react";
import { Redirect } from 'react-router-dom';

export default function HomePage(props) {

    useEffect(() => {
        console.log(routes)
    })

    return (
        <div className="home-page-wrapper">
            
        </div>
    )
}