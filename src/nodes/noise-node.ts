export default (context: AudioContext) =>
    context.audioWorklet.addModule("noise-worklet.js").then(
        () =>
            class extends AudioWorkletNode {
                constructor() {
                    super(context, "noise-worklet")
                }
            }
    )
