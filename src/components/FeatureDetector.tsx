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

function detectSharedArrayBuffer() {
    try {
        // Try to create a SharedArrayBuffer
        if (typeof SharedArrayBuffer !== 'undefined') {
            const sab = new SharedArrayBuffer(1);
            return sab.byteLength === 1;
        }
    } catch (e) {
        // If creation fails, it's not available
    }
    return false;
}

export default class extends React.PureComponent<Props> {
    state = {
        featuresChecked: false,
        features: [] as Feature[]
    }

    componentDidMount() {
        // Check features at runtime after component mounts
        const features = [
            {
                friendlyName: "Audio Worklet",
                available: isAudioWorkletInBaseAudioContext(),
            },
            {
                friendlyName: "SharedArrayBuffer",
                available: detectSharedArrayBuffer(),
                description: "Requires HTTPS and COOP/COEP headers"
            },
            { 
                friendlyName: "WebGL", 
                available: detectWebGLContext() 
            },
        ];
        
        this.setState({ features, featuresChecked: true });
    }

    render() {
        const { children, fallback } = this.props
        const { features, featuresChecked } = this.state

        if (!featuresChecked) {
            return <div>Checking browser features...</div>
        }

        if (features.every(f => f.available)) {
            return children
        } else {
            return fallback(features)
        }
    }
}
