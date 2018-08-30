import React from "react"

interface IProps {
    coeffA: number[]
    coeffB: number[]
}

export default class extends React.PureComponent<IProps> {
    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement

    setContext = (canvas: HTMLCanvasElement) => {
        this.canvas = canvas
        const ctx = (this.ctx = canvas.getContext("2d"))
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        console.log(nextProps)
    }

    redraw = () => {
        if (this.ctx) {
            const ctx = this.ctx

            const { width, height } = this.canvas.getBoundingClientRect()

            ctx.imageSmoothingEnabled = false
            ctx.strokeStyle = "black"
            ctx.lineWidth = 1

            ctx.clearRect(0, 0, width, height)

            console.log("Dim", width, height)

            ctx.beginPath()
            ctx.moveTo(0, height / 2)

            for (let x = 0; x < width; x++) {
                ctx.lineTo(
                    x,
                    height / 2 +
                        (Math.random() - 0.5) *
                            Math.random() *
                            Math.random() *
                            (height / 4)
                )
            }
            ctx.stroke()
        }
    }

    render() {
        return <canvas ref={this.setContext} onClick={this.redraw} />
    }
}
