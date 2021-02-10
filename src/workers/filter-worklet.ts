const WINDOW_SIZE = 1024

registerProcessor(
    "filter-worklet",
    class extends AudioWorkletProcessor {
        static parameterDescriptors = [
            {
                name: "coeffs",
                defaultValue: [0],
            },
        ]

        y_buffer = new Float32Array(WINDOW_SIZE)
        x_buffer = new Float32Array(WINDOW_SIZE)
        head = 0

        constructor() {
            super()

            this.port.onmessage = event => {
                // Handling data from the node.
                console.log(event.data)
            }

            this.port.postMessage("Hi!")
        }

        filter(y: Float32Array, x: Float32Array, n: number): void {}

        process(
            inputs: Float32Array[][],
            outputs: Float32Array[][],
            parameters: AudioParams
        ) {
            let n = this.head
            const x = this.x_buffer
            const y = this.y_buffer

            let input = inputs[0]
            let output = outputs[0]
            let inputChannel0 = input[0]
            let outputChannel0 = output[0]

            for (let i = 0; i < outputChannel0.length; ++i) {
                x[n] = inputChannel0[i]
                y[n] = 0.5 * x[n] + 0.5 * x[Math.round((n - 1) & WINDOW_SIZE)]
                outputChannel0[i] = y[n]
                n = (n + 1) & WINDOW_SIZE
            }

            this.head = n

            return true
        }
    }
)
