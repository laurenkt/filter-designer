import React from "react"
import { render } from "react-dom"
import UnitCircle from "./components/UnitCircle"
import DifferenceEquations from "./components/DifferenceEquations"
import Response from "./components/Response"
import Resizer from "./components/Resizer"
import "./style.scss"

const $ = (selector: string) => document.querySelector(selector)

declare var AudioWorkletProcessor: any

// detection strategy via GoogleChromeLabs/web-audio-samples
let isAudioWorkletInBaseAudioContext = () => {
    let context = new OfflineAudioContext(1, 1, 44100)
    return (
        context.audioWorklet &&
        typeof context.audioWorklet.addModule === "function"
    )
}

export interface Coefficients {
    A: number[]
    B: number[]
}

interface State {
    coeffs: Coefficients
}

class App extends React.PureComponent<{}, State> {
    state = {
        coeffs: {
            A: [0.5, 0.5],
            B: [0, 1],
        },
    }

    audioWorkletAvailable: boolean = isAudioWorkletInBaseAudioContext()

    onChangeCoeffs = (A: number[], B: number[]) => {
        this.setState({ coeffs: { A, B } })
    }

    render() {
        const { coeffs } = this.state

        return (
            <>
                <div className="row">
                    <div className="panel">
                        {this.audioWorkletAvailable &&
                            "No AudioWorkletProcessor"}
                    </div>
                    <Resizer className="panel">
                        {(width, height) => (
                            <UnitCircle
                                width={width}
                                height={height}
                                coeffA={coeffs.A}
                                coeffB={coeffs.B}
                                onChangeCoeffs={this.onChangeCoeffs}
                            />
                        )}
                    </Resizer>
                </div>
                <div className="row">
                    <Resizer className="panel">
                        {(width, height) => (
                            <Response
                                width={width}
                                height={height}
                                coeffA={coeffs.A}
                                coeffB={coeffs.B}
                            />
                        )}
                    </Resizer>
                    <DifferenceEquations coeffA={coeffs.A} coeffB={coeffs.B} />
                </div>
            </>
        )
    }
}

document.addEventListener("DOMContentLoaded", _ => {
    render(<App />, document.querySelector("main"))
})
