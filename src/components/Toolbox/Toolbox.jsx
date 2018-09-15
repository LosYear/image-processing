import React from 'react';
import './Toolbox.scss';
import ExpandableContainer from "./ExpandableContainer";
import ActionLink from "./ActionLink";
import Histogram from "../Histogram/Histogram";
import {connect} from 'react-redux';
import {getHistogramData} from "../../selectors/image";

class Toolbox extends React.Component {
    render() {
        return <div className="toolbox">
            <div className="toolbox-group">
                <h2 className="toolbox__header">Информация</h2>
                <div>
                    <ExpandableContainer title="Гистрограмма" defaultExpanded={true}>
                        <Histogram data={this.props.histogram}/>
                    </ExpandableContainer>
                    <ExpandableContainer title="График преобразования">
                        Гистрограмма<br/>
                    </ExpandableContainer>
                </div>
            </div>
            <div className="toolbox-group">
                <h2 className="toolbox__header">Действия</h2>
                <div>
                    <ActionLink title="Оттенки серого"/>
                    <ExpandableContainer title="Яркость">
                        Content<br/>
                    </ExpandableContainer>
                    <ExpandableContainer title="Негатив">
                        Content<br/>
                    </ExpandableContainer>
                </div>
            </div>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        histogram: getHistogramData(state)
    };
}

export default connect(mapStateToProps)(Toolbox);