type AudioParams = {
    [key: string]: AudioParam
}

interface AudioWorkletProcessor {
    port: MessagePort
    process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: AudioParams
    ): boolean
}

declare var AudioWorkletProcessor: {
    prototype: AudioWorkletProcessor
    port: MessagePort
    process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: AudioParams
    ): boolean
    new (): AudioWorkletProcessor
}

declare function registerProcessor(
    name: string,
    processor: AudioWorkletProcessor
): void

export default class FilterWorkletProcessor extends AudioWorkletProcessor {
    // Static getter to define AudioParam objects in this custom processor.
    static get parameterDescriptors() {
        return [
            {
                name: "myParam",
                defaultValue: 0.707,
            },
        ]
    }

    constructor() {
        super()

        this.port.onmessage = event => {
            // Handling data from the node.
            console.log(event.data)
        }

        this.port.postMessage("Hi!")
    }

    process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: AudioParams
    ) {
        // |myParamValues| is a Float32Array of 128 audio samples calculated
        // by WebAudio engine from regular AudioParam operations. (automation
        // methods, setter) By default this array would be all values of 0.707
        // The processor may have multiple inputs and outputs. Get the first input and
        // output.
        let input = inputs[0]
        let output = outputs[0]

        // Each input or output may have multiple channels. Get the first channel.
        let inputChannel0 = input[0]
        let outputChannel0 = output[0]

        // Get the parameter value array.
        let myParamValues = parameters.myParam

        // Simple gain (multiplication) processing over a render quantum (128 samples).
        // This processor only supports the mono channel.
        for (let i = 0; i < inputChannel0.length; ++i) {
            outputChannel0[i] = Math.random() * 2 - 1
        }

        // To keep this processor alive.
        return true
    }
}

registerProcessor("filter-worklet", FilterWorkletProcessor)
