import React from "react"
import { render } from "react-dom"
import FeatureDetector from "./components/FeatureDetector"
import App from "./App"
import "./style.scss"

const $ = (selector: string) => document.querySelector(selector)

class Mount extends React.PureComponent {}

document.addEventListener("DOMContentLoaded", _ => {
    render(
        <FeatureDetector
            fallback={features => (
                <table>
                    <tbody>
                        {features.map(({ friendlyName, available }) => (
                            <tr key={friendlyName}>
                                <th>{friendlyName}</th>
                                <td>{available ? "✅" : "❌"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        >
            <App />
        </FeatureDetector>,
        document.querySelector("main")
    )
})
