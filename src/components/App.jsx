import React from 'react'
import { debounce } from 'lodash';
import { getCurrentWeather } from '../api';
//import { LOAD_STATUSES } from '../constants';


export class App extends React.Component {
    state = {
        city: '',
        data: { },
    }

/*     fetchWeather(params) {
        this.setState({ loadStatus: LOAD_STATUSES.LOADING });

        getCurrentWeather(params)
            .then(( main ) => {
                this.setState({ loadStatus: LOAD_STATUSES.LOADED, data: main });
            }).catch(() => {
                this.setState({ loadStatus: LOAD_STATUSES.ERROR, data: {} });
            });
    } */

    fetchWeatherDebounce = debounce(getCurrentWeather, 1000)

    componentDidUpdate(_, prevState) {
        if (prevState.city !== this.state.city) {
            this.fetchWeatherDebounce({ city: this.state.city })
        }
    }

    render() {
        return <div>
            <input value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
        </div>
    }
}
