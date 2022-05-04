import React from 'react'
import { connect } from 'react-redux';
import { WeatherSelectors, WeatherAC } from '../store';
import { debounce } from 'lodash';
import { getCurrentWeather } from '../api';
import { Loader } from './common'
//import { WeatherTable } from './WeatherTable';
import css from './styles.module.css';



export class AppOriginal extends React.Component {
    state = {
        city: '',
    }

/*     fetchWeather(params) {
        const { onStart, onError, onSuccess } = this.props;
        
        onStart();

        getCurrentWeather(params)
            .then((data) => {
                onSuccess(data.main);
            }).catch(() => {
                onError();
            });
    } */

    fetchWeatherDebounce = debounce(this.props.getWeather, 1000);

    componentDidMount() {
        this.props.getWeather(this.state.city)
    };

    componentDidUpdate(_, prevState) {
        if (prevState.city !== this.state.city) {
            this.fetchWeatherDebounce({ city: this.state.city })
        }
    };

    
    render() {
        const { data, isLoading, isError, isLoaded } = this.props;
        console.log({ s: this.state.loadStatus });
        console.log(this.props);
        return <div className={css.main}>
            <span className={css.title}>Введите город:</span>
            <input value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
            {isLoading && <Loader />}
            {isError  && <span className={css.error}>Не удалось найти город, попробуйте изменить запрос</span>}
            {isLoaded && (
                <div className={css.info}>
                    Сейчас в городе :
                </div>
            )}
            {isLoaded && (
            <table>
                <thead>
                    <th>Температура</th>
                    <th>Ощущается как</th>
                    <th>Влажность</th>
                    <th>Давление</th>
                </thead>
                <tbody>
                    <td>{data.temp}</td>
                    <td>{data.feels_like}</td>
                    <td>{data.humidity}</td>
                    <td>{data.pressure}</td>
                </tbody>
            </table>
            )}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        data: WeatherSelectors.getWeather(state),
        isLoading: WeatherSelectors.isLoading(state),
        isError: WeatherSelectors.isError(state),
        isLoaded: WeatherSelectors.isLoaded(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    getWeather: (city) => dispatch(WeatherAC.fetchWeather(city))
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal);