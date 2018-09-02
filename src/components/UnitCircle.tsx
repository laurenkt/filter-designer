import React, { MouseEventHandler } from "react"
import { ContextReplacementPlugin } from "webpack"

interface IProps extends React.ClassAttributes<UnitCircle> {
    coeffA: number[]
    coeffB: number[]
    width: number
    height: number
    onChangeCoeffs: (coeffA: number[], coeffB: number[]) => void
}

interface IState {
    poles: Coordinate[]
    zeros: Coordinate[]
}

type Coordinate = { x: number; y: number }

class Cross extends React.PureComponent<{
    cx: number
    cy: number
    r: number
    [key: string]: any
}> {
    render() {
        const { cx, cy, r, ...props } = this.props

        // scale r
        const rs = (r * 1) / Math.sqrt(2)

        return (
            <g>
                <line
                    x1={cx + rs}
                    x2={cx - rs}
                    y1={cy - rs}
                    y2={cy + rs}
                    {...props}
                    strokeWidth={2}
                />
                <line
                    x1={cx - rs}
                    x2={cx + rs}
                    y1={cy - rs}
                    y2={cy + rs}
                    {...props}
                    strokeWidth={2}
                />
            </g>
        )
    }
}

export default class UnitCircle extends React.PureComponent<IProps, IState> {
    private svg: SVGSVGElement
    private onMouseUpListener?: EventListener
    private onMouseMoveListener?: EventListener

    state = {
        poles: [{ x: 0, y: 0 }],
        zeros: [{ x: 0, y: 20 }],
    }

    constructor(props: IProps) {
        super(props)
    }

    onDoubleClick = (idx?: number, isPole = true) => (
        e: React.MouseEvent<SVGElement>
    ) => {
        e.preventDefault()
        e.stopPropagation()

        const origin = this.svg.createSVGPoint()

        origin.x = e.clientX
        origin.y = e.clientY

        if (idx === undefined) {
            this.setState({
                poles: [
                    ...this.state.poles,
                    origin.matrixTransform(this.svg.getScreenCTM()!.inverse()),
                ],
            })
        } else {
            if (isPole) {
                const poles = [
                    ...this.state.poles.slice(0, idx),
                    ...this.state.poles.slice(idx + 1),
                ]
                const zeros = [...this.state.zeros, this.state.poles[idx]]
                this.setState({ poles, zeros })
            } else {
                const zeros = [
                    ...this.state.zeros.slice(0, idx),
                    ...this.state.zeros.slice(idx + 1),
                ]
                this.setState({ zeros })
            }
        }
    }

    onMouseDown = (idx: number, isPole: boolean) => (
        e: React.MouseEvent<SVGElement>
    ) => {
        e.preventDefault()
        e.stopPropagation()

        this.onMouseMoveListener = this.onMouseMove(idx, isPole)
        this.onMouseUpListener = this.onMouseUp(idx)

        window.addEventListener("mousemove", this.onMouseMoveListener)
        window.addEventListener("mouseup", this.onMouseUpListener)
    }

    onMouseUp = (idx: number) => (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        window.removeEventListener("mousemove", this.onMouseMoveListener!)
        window.removeEventListener("mouseup", this.onMouseUpListener!)

        this.props.onChangeCoeffs(
            [Math.random(), Math.random()],
            [Math.random(), Math.random()]
        )
    }

    onMouseMove = (idx: number, isPole: boolean) => (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const origin = this.svg.createSVGPoint()

        origin.x = e.clientX
        origin.y = e.clientY

        if (isPole) {
            const poles = [...this.state.poles]
            poles[idx] = origin.matrixTransform(
                this.svg.getScreenCTM()!.inverse()
            )

            this.setState({
                poles,
            })
        } else {
            const zeros = [...this.state.zeros]
            zeros[idx] = origin.matrixTransform(
                this.svg.getScreenCTM()!.inverse()
            )

            this.setState({
                zeros,
            })
        }
    }

    render() {
        const { poles, zeros } = this.state
        const { width, height } = this.props

        return (
            <svg
                width={width}
                height={height}
                ref={el => (this.svg = el!)}
                viewBox={`-100 -100 200 200`}
                onDoubleClick={this.onDoubleClick(undefined)}
            >
                <line
                    y1={-1000}
                    y2={1000}
                    x1={0}
                    x2={0}
                    stroke="black"
                    strokeWidth={1}
                />
                <line
                    y1={0}
                    y2={0}
                    x1={-1000}
                    x2={1000}
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
                <g>
                    {zeros.map((c: Coordinate, idx) => (
                        <Cross
                            key={idx}
                            r={5}
                            cx={c.x}
                            cy={c.y}
                            stroke="black"
                            strokeWidth={1}
                            fill="white"
                            onDoubleClick={this.onDoubleClick(idx, false)}
                            onMouseDown={this.onMouseDown(idx, false)}
                        />
                    ))}
                    {poles.map((c: Coordinate, idx) => (
                        <circle
                            key={idx}
                            r={5}
                            cx={c.x}
                            cy={c.y}
                            stroke="black"
                            strokeWidth={1}
                            fill="white"
                            onDoubleClick={this.onDoubleClick(idx, true)}
                            onMouseDown={this.onMouseDown(idx, true)}
                        />
                    ))}
                </g>
            </svg>
        )
    }
}
