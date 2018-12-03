import React from 'react';
import './Toolbox.scss';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import ExpandableContainer from './ExpandableContainer';
import ActionLink from './ActionLink';
import Histogram from '../Histogram/Histogram';
import { getGrayscaledFlag, getHistogramData } from '../../selectors/image';
import {
  createGrayscale,
  createNegative,
  createSolarised,
  createIncreasedContrast,
  createDecreasedContrast,
  createBlurredImage,
  createImageWithMedianFilter
} from '../../actions';
import TooltippedSlider from './TooltippedSlider';
import NumberGroup from './NumberGroup';

class Toolbox extends React.Component {
  render() {
    return (
      <div className="toolbox">
        <Scrollbars autoHide>
          <div className="toolbox__inner">
            <div className="toolbox-group">
              <h2 className="toolbox__header">Информация</h2>
              <div>
                <ExpandableContainer title="Гистрограмма">
                  <Histogram data={this.props.histogram} color="black" />
                </ExpandableContainer>
              </div>
            </div>
            <div className="toolbox-group">
              <h2 className="toolbox__header">Действия</h2>
              <div>
                {!this.props.grayscaled && (
                  <ActionLink
                    title="Оттенки серого"
                    handleClick={this.props.createGrayscale}
                  />
                )}

                {this.props.grayscaled && (
                  <div>
                    <ExpandableContainer title="Негатив">
                      <TooltippedSlider
                        max={255}
                        min={0}
                        handleClick={value => this.props.createNegative(value)}
                        onChange={value => this.props.createNegative(value)}
                      />
                    </ExpandableContainer>

                    <ExpandableContainer title="Соляризация">
                      <NumberGroup
                        defaultValue={0.01}
                        step={0.005}
                        handleClick={value => this.props.createSolarised(value)}
                      />
                    </ExpandableContainer>

                    <ExpandableContainer title="Увеличение контрастности">
                      <TooltippedSlider
                        min={0}
                        max={255}
                        range
                        defaultValue={[50, 150]}
                        handleClick={value =>
                          this.props.createIncreasedContrast(value[0], value[1])
                        }
                      />
                    </ExpandableContainer>

                    <ExpandableContainer title="Уменьшение контрастности">
                      <TooltippedSlider
                        min={0}
                        max={255}
                        range
                        defaultValue={[50, 150]}
                        handleClick={value =>
                          this.props.createDecreasedContrast(value[0], value[1])
                        }
                      />
                    </ExpandableContainer>

                    <ExpandableContainer title="Сглаживание">
                      <TooltippedSlider
                        min={3}
                        max={20}
                        defaultValue={3}
                        handleClick={value =>
                          this.props.createBlurredImage(value)
                        }
                      />
                    </ExpandableContainer>

                    <ActionLink
                      title="Медианный фильтр"
                      handleClick={this.props.createImageWithMedianFilter}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    histogram: getHistogramData(state),
    grayscaled: getGrayscaledFlag(state)
  };
}

export default connect(
  mapStateToProps,
  {
    createGrayscale,
    createNegative,
    createSolarised,
    createIncreasedContrast,
    createDecreasedContrast,
    createBlurredImage,
    createImageWithMedianFilter
  }
)(Toolbox);
