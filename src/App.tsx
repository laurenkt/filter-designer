import React from "react"
import UnitCircle from "./components/UnitCircle"
import DifferenceEquations from "./components/DifferenceEquations"
import Response from "./components/Response"
import Resizer from "./components/Resizer"
import NoiseNodeFactory from "./nodes/noise-node"
import FilterNodeFactory from "./nodes/filter-node"
import memoize from "memoize-one"

declare var AudioWorkletProcessor: any

export interface Coefficients {
    A: number[]
    B: number[]
}

interface State {
    coeffs: Coefficients
}

export default class extends React.PureComponent<{}, State> {
    state = {
        coeffs: {
            A: [0.5, 0.5],
            B: [0, 1],
        },
        audioSource: null,
        samplingFreq: 44100,
        window: "hamming",
    }

    onChangeCoeffs = (A: number[], B: number[]) => {
        this.setState({ coeffs: { A, B } })
    }

    onClick = memoize(
        (key: string, value: string) => async (
            event: React.MouseEvent<HTMLElement>
        ) => {
            event.preventDefault()

            const audioCtx = new AudioContext()

            const NoiseNode = await NoiseNodeFactory(audioCtx)
            const FilterNode = await FilterNodeFactory(audioCtx)

            const source = new NoiseNode()
            const filter = new FilterNode()

            source.connect(filter)
            filter.connect(audioCtx.destination)
        }
    )

    render() {
        const { coeffs } = this.state

        return (
            <>
                <div className="row">
                    <div className="panel">
                        <div>
                            Audio Source
                            <button
                                onClick={this.onClick("audioSource", "noise")}
                                className="active"
                            >
                                Noise
                            </button>
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
