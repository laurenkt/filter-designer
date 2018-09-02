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

interface Coefficients {
    A: number[]
    B: number[]
}

class App extends React.Component {
    state = {
        coeffA: [0.5, 0.5],
        coeffB: [0, 1],
    }

    audioWorkletAvailable: boolean = isAudioWorkletInBaseAudioContext()

    onChangeCoeffs = (A: number[], B: number[]) => {
        this.setState({ coeffA: A, coeffB: B })
    }

    render() {
        const { coeffA, coeffB } = this.state

        return (
            <div className="fill">
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
                                coeffA={coeffA}
                                coeffB={coeffB}
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
                                coeffA={coeffA}
                                coeffB={coeffB}
                            />
                        )}
                    </Resizer>
                    <DifferenceEquations coeffA={coeffA} coeffB={coeffB} />
                </div>
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", _ => {
    const root = document.createElement("main")
    render(<App />, root)
    $("body")!.appendChild(root)
})
