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
        const { width, height } = this.props
        this.canvas = canvas
        this.canvas.width = width * 2
        this.canvas.height = height * 2
        this.ctx = canvas.getContext("2d")!
        this.imageData = this.ctx.createImageData(width * 2, height * 2)
        this.redraw()
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.values = new Int16Array(nextProps.width * 2)
        if (this.ctx) {
            this.imageData = this.ctx.createImageData(
                nextProps.width * 2,
                nextProps.height * 2
            )
        }
    }

    redraw = () => {
        if (this.ctx) {
            const ctx = this.ctx

            if (this.imageData && this.values) {
                const { width, height } = this.props
                const w = width * 2
                const h = height * 2

                for (let i = 0; i < w; i++) {
                    this.values[i] =
                        (this.values[(i - 2) % w] +
                            this.values[(i - 1) % w] +
                            (Math.random() - 0.5) * 5) /
                        2
                }

                const origin = h / 2

                for (let x = 0; x < w; x++) {
                    const line = this.values[x]

                    for (let y = 0; y < h; y++) {
                        const offset = (x + y * w) * 4

                        const real_y = y - Math.round(height)

                        const output = real_y === line ? 0x00 : 0xff

                        this.imageData.data[offset + 0] = output
                        this.imageData.data[offset + 1] = output
                        this.imageData.data[offset + 2] = output
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
