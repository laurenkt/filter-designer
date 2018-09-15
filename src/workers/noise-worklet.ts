registerProcessor(
    "noise-worklet",
    class extends AudioWorkletProcessor {
        process(_: any, outputs: Float32Array[][]) {
            let y = outputs[0][0]

            for (let i = 0; i < y.length; ++i) {
                y[i] = Math.random() * 2 - 1
            }

            return true
        }
    }
)
