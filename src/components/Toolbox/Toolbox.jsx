import React from 'react';
import './Toolbox.scss';
import ExpandableContainer from "./ExpandableContainer";
import ActionLink from "./ActionLink";
import Histogram from "../Histogram/Histogram";
import {connect} from 'react-redux';
import {getHistogramData} from "../../selectors/image";
import {createGrayscale, createNegative} from "../../actions";
import TooltippedSlider from "./TooltippedSlider";

class Toolbox extends React.Component {
    render() {
        return <div className="toolbox">
            <div className="toolbox-group">
                <h2 className="toolbox__header">Информация</h2>
                <div>
                    <ExpandableContainer title="Гистрограмма">
                        <Histogram data={this.props.histogram} color="black"/>
                    </ExpandableContainer>
                </div>
            </div>
            <div className="toolbox-group">
                <h2 className="toolbox__header">Действия</h2>
                <div>
                    <ActionLink title="Оттенки серого" handleClick={this.props.createGrayscale}/>
                    <ExpandableContainer title="Негатив">
                        <TooltippedSlider max={255} onAfterChange={(value) => this.props.createNegative(value)}/>
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

export default connect(mapStateToProps, {createGrayscale, createNegative})(Toolbox);