import React from "react"
import brace from "brace"
import AceEditor from "react-ace"

import "brace/mode/java"
import "brace/theme/github"

interface IProps extends React.ClassAttributes<DifferenceEquations> {
    coeffA: number[]
    coeffB: number[]
}

type Coefficients = number[]

export default class DifferenceEquations extends React.PureComponent<IProps> {
    render() {
        const { coeffA, coeffB } = this.props

        return (
            <div className="panel">
                <AceEditor
                    mode="javascript"
                    theme="github"
                    value={this.getDifferenceEquationForCoeffs(coeffA, coeffB)}
                    editorProps={{ $blockScrolling: true }}
                />
            </div>
        )
    }

    getDifferenceEquationForCoeffs(a: Coefficients, b: Coefficients): string {
        function idxToOffset(idx: number) {
            if (idx === 0) {
                return "n"
            }

            return `n-${idx}`
        }

        function printCoeffForVariable(varName: string) {
            const round = (number: number, digits: number) =>
                Math.round(number * 10 * digits) / (10 * digits)

            return (val: number, idx: number) => {
                if (val === 0) {
                    return ""
                } else {
                    return `${
                        val != 1 ? round(val, 2) + "*" : ""
                    }${varName}[${idxToOffset(a.length - 1 - idx)}]`
                }
            }
        }

        function printCoeffsForVariable(varName: string, c: Coefficients) {
            return c
                .map(printCoeffForVariable(varName))
                .filter(s => s != "")
                .join(" + ")
        }

        return `${printCoeffsForVariable("y", b)} = ${printCoeffsForVariable(
            "x",
            a
        )}`
    }
}
