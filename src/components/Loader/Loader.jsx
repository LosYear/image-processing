import React from 'react';
import Icon from "./loader.svg";
import "./Loader.scss";

export default (props) => (
    <div>
        {props.withBackdrop && <div className="loader-backdrop"/>}
        <div className="loader">
            <Icon/>
        </div>
    </div>
);