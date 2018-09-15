import React from 'react';
import './ActionLink.scss';

const ActionLink = (props) => (
    <section className="action-link">
        <div className="action-link__title"
             onClick={props.handleClick}>{props.title}
        </div>
    </section>
);

export default ActionLink;