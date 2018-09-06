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
    private imageData?: ImageData
    private values?: Int16Array

    setContext = (canvas: HTMLCanvasElement) => {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!
        const { width, height } = this.props
        this.imageData = this.ctx.createImageData(width, height)
        this.redraw()
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.values = new Int16Array(nextProps.width)
        if (this.ctx) {
            this.imageData = this.ctx.createImageData(
                nextProps.width,
                nextProps.height
            )
        }
    }

    redraw = () => {
        if (this.ctx) {
            const ctx = this.ctx

            if (this.imageData && this.values) {
                for (let i = 0; i < this.values.length; i++) {
                    this.values[i] =
                        this.values[(i - 1) % this.values.length] +
                        (Math.random() - 0.5) *
                            Math.random() *
                            Math.random() *
                            2
                }

                for (let x = 0; x < this.imageData.width; x++) {
                    for (let y = 0; y < this.imageData.height; y++) {
                        const offset = (x + y * this.imageData.width) * 4
                        const value =
                            Math.abs(y - this.imageData.height / 2) <
                            Math.abs(this.values[x])
                                ? 0x00
                                : 0xff

                        this.imageData.data[offset + 0] = value
                        this.imageData.data[offset + 1] = value
                        this.imageData.data[offset + 2] = value
                        this.imageData.data[offset + 3] = 0xff
                    }
                }
                ctx.putImageData(this.imageData!, 0, 0)
            }

            /*
            const { width, height } = this.props

            ctx.imageSmoothingEnabled = false
            ctx.strokeStyle = "black"
            ctx.lineWidth = 1
            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            ctx.moveTo(0, height / 2)

            for (let x = 0; x < width; x++) {
                ctx.lineTo(
                    x,
                    height / 4 +
                        (Math.random() - 0.5) *
                            Math.random() *
                            Math.random() *
                            (height / 4)
                )
            }
            ctx.stroke()
            */

            window.requestAnimationFrame(this.redraw)
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
