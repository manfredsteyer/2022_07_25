import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  stats: unknown;
  basket: unknown;
  skipList: number[];

  flights2: {
    [flightId: number]: Flight
  },
  passagiere: {
    [passagierId: number]: unknown
  },
  passengerList: number[];
  flightsList: number[]
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {},
  basket: {},
  skipList: [4],

  // Normalisierten Struktur
  flights2: {
    "1": {id:1, from: 'A', to: 'B', date: '', delayed: false }
  }, 
  passagiere: {
    "50": { id:50, flightId: 1}
  },
  passengerList: [50, 7, 14],
  flightsList: [10, 22, 1]
};

export const reducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {

    const flights = action.flights;
    return { ...state, flights };

  }),

  on(updateFlight, (state, action) => {

    const flight = action.flight;
    const flights = state.flights;

    const newFlights = flights.map(f => (f.id === flight.id ) ? flight : f);

    return { ...state, flights: newFlights}

  }),


);
