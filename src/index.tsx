import React from "react"
import { render } from "react-dom"
import FeatureDetector from "./components/FeatureDetector"
import App from "./App"
import "./style.scss"
import NoiseNodeFactory from "./nodes/noise-node"

const audioCtx = new AudioContext()

NoiseNodeFactory(audioCtx).then(NoiseNode => {
    let node = new NoiseNode()
    node.connect(audioCtx.destination)
})

document.addEventListener("DOMContentLoaded", _ => {
    render(
        <FeatureDetector
            fallback={features => (
                <>
                    <p style={{ maxWidth: 500, textAlign: "center" }}>
                        This is a tech demo and uses features that are only
                        recently developed and don't currently have widespread
                        adoption. Your browser does not support some of the
                        necessary features. See below for which features are
                        required and which browsers you can use to get them.
                    </p>
                    <table>
                        <tbody>
                            {features.map(({ friendlyName, available }) => (
                                <tr key={friendlyName}>
                                    <th>{friendlyName}</th>
                                    <td>{available ? "✅" : "❌"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        >
            <App />
        </FeatureDetector>,
        document.querySelector("main")
    )
})
