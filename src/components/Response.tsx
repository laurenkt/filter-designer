import React from "react"

interface Props {
    width: number
    height: number
    coeffA: number[]
    coeffB: number[]
}

export default class extends React.PureComponent<Props> {
    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement

    setContext = (canvas: HTMLCanvasElement) => {
        this.canvas = canvas
        const ctx = (this.ctx = canvas.getContext("2d")!)
    }

    redraw = () => {
        if (this.ctx) {
            const ctx = this.ctx

            const { width, height } = this.props

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
                    //height / 2 +
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
        const { width, height } = this.props

        return (
            <canvas
                style={{ width, height }}
                ref={this.setContext}
                onClick={this.redraw}
            />
        )
    }
}
