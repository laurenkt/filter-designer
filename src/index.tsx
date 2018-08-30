import React from "react"
import { render } from "react-dom"
import UnitCircle from "./components/UnitCircle"
import DifferenceEquations from "./components/DifferenceEquations"
import Response from "./components/Response"
// @ts-ignore no typedefs
import PanelGroup from "react-panelgroup"
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
                <PanelGroup
                    direction="row"
                    panelWidths={[
                        { size: 1, resize: "stretch" },
                        { size: 1, resize: "stretch" },
                    ]}
                >
                    <PanelGroup
                        direction="column"
                        panelWidths={[
                            { size: 1, resize: "stretch" },
                            { size: 1, resize: "stretch" },
                        ]}
                    >
                        <div className="panel">
                            {this.audioWorkletAvailable &&
                                "No AudioWorkletProcessor"}
                        </div>
                        <UnitCircle
                            coeffA={coeffA}
                            coeffB={coeffB}
                            onChangeCoeffs={this.onChangeCoeffs}
                        />
                    </PanelGroup>
                    <PanelGroup
                        direction="column"
                        panelWidths={[
                            { size: 1, resize: "stretch" },
                            { size: 1, resize: "stretch" },
                        ]}
                    >
                        <div className="panel">
                            <Response coeffA={coeffA} coeffB={coeffB} />
                        </div>
                        <DifferenceEquations coeffA={coeffA} coeffB={coeffB} />
                    </PanelGroup>
                </PanelGroup>
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", _ => {
    const root = document.createElement("main")
    render(<App />, root)
    $("body").appendChild(root)
})
