import React from 'react';
import './Toolbox.scss';
import ExpandableContainer from "./ExpandableContainer";
import ActionLink from "./ActionLink";
import Histogram from "../Histogram/Histogram";
import {connect} from 'react-redux';
import {getHistogramData} from "../../selectors/image";
import {createGrayscale, createNegative, createSolarised} from "../../actions";
import TooltippedSlider from "./TooltippedSlider";
import NumberGroup from "./NumberGroup";
import {Scrollbars} from 'react-custom-scrollbars';


class Toolbox extends React.Component {
    render() {
        return <div className="toolbox">
            <Scrollbars autoHide={true}>
                <div className="toolbox__inner">
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
                                <TooltippedSlider max={255}
                                                  onAfterChange={(value) => this.props.createNegative(value)}/>
                            </ExpandableContainer>
                            <ExpandableContainer title="Соляризация">
                                <NumberGroup defaultValue={0.01} step={0.005}
                                             handleClick={(value) => this.props.createSolarised(value)}/>
                            </ExpandableContainer>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        histogram: getHistogramData(state)
    };
}

export default connect(mapStateToProps, {createGrayscale, createNegative, createSolarised})(Toolbox);