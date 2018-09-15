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
