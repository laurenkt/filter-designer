import React from "react"
import { render } from "react-dom"
// @ts-ignore
import { getSupport } from "caniuse-api"

// detection strategy via GoogleChromeLabs/web-audio-samples
let isAudioWorkletInBaseAudioContext = () => {
    if (!("OfflineAudioContext" in window)) {
        return false
    }

    let context = new OfflineAudioContext(1, 1, 44100)
    return (
        context.audioWorklet &&
        typeof context.audioWorklet.addModule === "function"
    )
}

function detectWebGLContext() {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas")
    // Get WebGLRenderingContext from canvas element.
    var gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    // Report the result.
    return !!(gl && gl instanceof WebGLRenderingContext)
}

export interface Feature {
    friendlyName: string
    caniuseName?: string
    description?: string
    available: boolean
    browsers?: any
}

interface Props {
    fallback(features: Feature[]): JSX.Element
    children: JSX.Element
}

const features = [
    {
        friendlyName: "Audio Worklet",
        available: isAudioWorkletInBaseAudioContext(),
    },
    //{ friendlyName: "Web Worker", available: !!("Worker" in window) },
    /*{
        friendlyName: "Offscreen Canvas",
        available: !!("OffscreenCanvas" in window),
    },*/
    {
        friendlyName: "SharedArrayBuffer",
        available: !!("SharedArrayBuffer" in window),
    },
    { friendlyName: "WebGL", available: detectWebGLContext() },
]

export default class extends React.PureComponent<Props> {
    render() {
        const { children, fallback } = this.props

        if (features.every(f => f.available)) {
            return children
        } else {
            return fallback(features)
        }
    }
}
