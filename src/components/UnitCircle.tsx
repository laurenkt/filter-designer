import React from 'react';

interface IProps extends React.ClassAttributes<UnitCircle> {
    coeffA: number[];
    coeffB: number[];
}

interface IState {
    coords: { x: number; y: number };
}

export default class UnitCircle extends React.PureComponent<IProps, IState> {
    private svg?: SVGSVGElement;

    state = {
        coords: { x: 0, y: 0 }
    };

    constructor(props: IProps) {
        super(props);
    }

    onMouseDown = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        e.stopPropagation();

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    };

    onMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const origin = this.svg.createSVGPoint();

        origin.x = e.clientX;
        origin.y = e.clientY;

        this.setState({
            coords: origin.matrixTransform(this.svg.getScreenCTM().inverse())
        });
    };

    render() {
        const { coords } = this.state;

        return (
            <div className="panel">
                <svg ref={el => (this.svg = el)} viewBox="-100 -100 200 200">
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
                        r={50}
                        cx={0}
                        cy={0}
                        stroke="black"
                        strokeWidth={2}
                        fill="none"
                    />
                    <circle
                        r={5}
                        cx={coords.x}
                        cy={coords.y}
                        stroke="black"
                        strokeWidth={1}
                        fill="white"
                        onMouseDown={this.onMouseDown}
                    />
                </svg>
            </div>
        );
    }
}
