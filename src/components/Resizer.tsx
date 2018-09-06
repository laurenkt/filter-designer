import React from "react"

interface Props extends Partial<React.HTMLProps<HTMLElement>> {
    children(width: number, height: number): JSX.Element
}

interface State {
    width: number
    height: number
}

declare interface ResizeObserverEntry {
    contentRect: DOMRectReadOnly
    target: HTMLElement
}

declare class ResizeObserver {
    constructor(entries: (entries: ResizeObserverEntry[]) => any)
    observe(element: HTMLElement): void
}

export default class extends React.PureComponent<Props, State> {
    state = { width: 0, height: 0 }

    observer = new ResizeObserver(entries =>
        entries.map(entry => {
            const { width, height } = entry.contentRect
            this.setState({ width, height })
        })
    )

    registerObserver = (instance: HTMLElement | null) => {
        if (instance) {
            this.setState({
                width: instance.clientWidth,
                height: instance.clientHeight,
            })
            this.observer.observe(instance)
        }
    }

    componentWillUnmount() {}

    render() {
        const { width, height } = this.state
        const { children, ...props } = this.props

        return (
            <div
                // @ts-ignore For some reason this fails typecheck
                ref={this.registerObserver}
                {...props}
            >
                {width > 0 && height > 0 && children(width, height)}
            </div>
        )
    }
}
