import React from 'react'

export class WeatherTable extends React.Component{ 
    render() {
        return (
            <table>
                <thead>
                    <th>Температура</th>
                    <th>Ощущается как</th>
                    <th>Влажность</th>
                    <th>Давление</th>
                </thead>
                <tbody>
                    <td>{this.props.temp}</td>
                    <td>{this.props.feels_like}</td>
                    <td>{this.props.humidity}</td>
                    <td>{this.props.pressure}</td>
                </tbody>
            </table>
        )
    }
}
