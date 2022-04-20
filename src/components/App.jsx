import React from 'react'
import { debounce, toLower } from 'lodash';
import { getCurrentWeather } from '../api';
import { LOAD_STATUSES } from '../constants';
import { Loader } from './common'
import { WeatherTable } from './WeatherTable';
import css from './styles.module.css';


export class App extends React.Component {
    state = {
        city: '',
        data: { },
        loadStatus: LOAD_STATUSES.UNKNOWN,
    }

    fetchWeather(params) {
        this.setState({ loadStatus: LOAD_STATUSES.LOADING });

        getCurrentWeather(params)
            .then(({ main }) => {
                this.setState({ loadStatus: LOAD_STATUSES.LOADED, data: main });
            }).catch(() => {
                this.setState({ loadStatus: LOAD_STATUSES.ERROR, data: {} });
            });
    }

    fetchWeatherDebounce = debounce(this.fetchWeather, 1000)

    componentDidUpdate(_, prevState) {
        if (prevState.city !== this.state.city) {
            this.fetchWeatherDebounce({ city: this.state.city })
        }
    }
    render() {
        console.log({ s: this.state.loadStatus});
        return <div className={css.main}>
            <span className={css.title}>Введите город:</span>
            <input value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
            {this.state.loadStatus === LOAD_STATUSES.LOADING && <Loader />}
            {this.state.loadStatus === LOAD_STATUSES.ERROR && <span className={css.error}>Не удалось найти город, попробуйте изменить запрос</span>}
            {this.state.loadStatus === LOAD_STATUSES.LOADED && (
                <div className={css.info}>
                Сейчас в городе {this.state.city}:
                </div>
            )}
            {this.state.loadStatus === LOAD_STATUSES.LOADED && (
                <WeatherTable {...this.state.data} />
            )}
        </div>
    }
}

