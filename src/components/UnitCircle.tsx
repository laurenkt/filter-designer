import React from 'react';

export default class extends React.PureComponent {
    render() {
        return (
            <div className="panel">
                <svg viewBox="-100 -100 200 200">
                    <line
                        y1={-100}
                        y2={100}
                        x1={0}
                        x2={0}
                        stroke="black"
                        strokeWidth={1}
                    />
                    <line
                        y1={0}
                        y2={0}
                        x1={-100}
                        x2={100}
                        stroke="black"
                        strokeWidth={1}
                    />
                    <circle
                        r={5}
                        cx={50}
                        cy={0}
                        stroke="black"
                        strokeWidth={1}
                        fill="none"
                    />
                    <circle
                        r={50}
                        cx={0}
                        cy={0}
                        stroke="black"
                        strokeWidth={2}
                        fill="none"
                    />
                </svg>
            </div>
        );
    }
}
