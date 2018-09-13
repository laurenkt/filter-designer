class FilterNode extends AudioWorkletNode {
    constructor(context: AudioContext) {
        super(context, "filter-worklet")
    }
}

let context = new AudioContext()
context.audioWorklet.addModule("filter-worklet.js").then(() => {
    let node = new FilterNode(context)
    node.connect(context.destination)
})
