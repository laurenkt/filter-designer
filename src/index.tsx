import React from 'react';
import { render } from 'react-dom';
// @ts-ignore no typedefs
import PanelGroup from 'react-panelgroup';
import './style.scss';
import UnitCircle from './components/UnitCircle';
import DifferenceEquations from './components/DifferenceEquations';

const $ = (selector: string) => document.querySelector(selector);

class App extends React.Component {
    state = {
        coeffA: [0.5, 0.5],
        coeffB: [0, 1]
    };

    render() {
        const { coeffA, coeffB } = this.state;

        return (
            <div className="fill">
                <PanelGroup
                    direction="row"
                    panelWidths={[
                        { size: 1, resize: 'stretch' },
                        { size: 1, resize: 'stretch' }
                    ]}
                >
                    <PanelGroup
                        direction="column"
                        panelWidths={[
                            { size: 1, resize: 'stretch' },
                            { size: 1, resize: 'stretch' }
                        ]}
                    >
                        <div className="panel">Something</div>
                        <UnitCircle />
                    </PanelGroup>
                    <PanelGroup
                        direction="column"
                        panelWidths={[
                            { size: 1, resize: 'stretch' },
                            { size: 1, resize: 'stretch' }
                        ]}
                    >
                        <div className="panel">Frequency Response</div>
                        <DifferenceEquations coeffA={coeffA} coeffB={coeffB} />
                    </PanelGroup>
                </PanelGroup>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', _ => {
    const root = document.createElement('main');
    render(<App />, root);
    $('body').appendChild(root);
});
