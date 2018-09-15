import React from 'react';
import Arrow from "./Arrow";
import './ExpandableContainer.scss';

class ExpandableContainer extends React.Component {
    constructor(props) {
        super(props);

        const {defaultExpanded} = this.props;

        this.state = {
            expanded: defaultExpanded || false
        };
    }

    render() {
        const {title} = this.props;
        const {expanded} = this.state;

        return <section className="expandable-container">
            <div className="expandable-container__title"
                 onClick={() => this.setState({...this.state, expanded: !expanded})}>{title} <Arrow
                expanded={expanded}/>
            </div>
            <div className={"expandable-container__content"}
                 style={{maxHeight: expanded ? this.refs.container.scrollHeight : 0}}
                 ref="container">
                <div className="expandable-container__content-wrapper">{this.props.children}</div>
            </div>
        </section>;
    }
}

export default ExpandableContainer;