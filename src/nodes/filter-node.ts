export default (context: AudioContext) =>
    context.audioWorklet.addModule("filter-worklet.js").then(
        () =>
            class extends AudioWorkletNode {
                constructor() {
                    super(context, "filter-worklet")
                }
            }
    )