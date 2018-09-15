import React from 'react';
import './Toolbox.scss';
import ExpandableContainer from "./ExpandableContainer";
import ActionLink from "./ActionLink";

class Toolbox extends React.Component {
    render() {
        return <div className="toolbox">
            <div className="toolbox-group">
                <h2 className="toolbox__header">Информация</h2>
                <div>
                    <ExpandableContainer title="Гистрограмма">
                        Гистрограмма<br/>
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

export default Toolbox;