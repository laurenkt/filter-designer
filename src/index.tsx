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
        audioSource: "noise",
        samplingFreq: 44100,
        window: "hamming",
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
                        {!this.audioWorkletAvailable &&
                            "No AudioWorkletProcessor"}
                        {this.audioWorkletAvailable && (
                            <>
                                <div>
                                    Audio Source
                                    <button className="active">Noise</button>
                                    <button>Modern Jazz Radio</button>
                                </div>
                                <div>
                                    Sampling Frequency
                                    <button className="active">44100kHz</button>
                                </div>
                                <div>
                                    Show Aliasing
                                    <button>Yes</button>
                                    <button className="active">No</button>
                                </div>
                                <div>
                                    Window
                                    <button className="active">Hamming</button>
                                    <button>Rectangular</button>
                                </div>
                                <div>
                                    Generate AudioWorklet
                                    <button>Yes</button>
                                    <button className="active">No</button>
                                </div>
                                <div>
                                    Presets
                                    <button>Low-pass</button>
                                    <button>High-pass</button>
                                </div>
                            </>
                        )}
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
                                coeffA={[]}
                                coeffB={[]}
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
