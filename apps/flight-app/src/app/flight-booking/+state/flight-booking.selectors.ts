import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);


export const selectFlights3 = createSelector(
  selectFlightBookingState,
  fbs => fbs.flights
);

export const selectSkipList = createSelector(
  selectFlightBookingState,
  fbs => fbs.skipList
);

export const selectFilteredFlights = createSelector(
  selectFlights3,
  selectSkipList,
  (flights, skipList) => flights.filter(f => !skipList.includes(f.id))
);

export const selectFlights = 
  (a: fromFlightBooking.FlightBookingAppState) => 
    a[fromFlightBooking.flightBookingFeatureKey].flights;


export const selectFlights2 = createSelector(
  (a: fromFlightBooking.FlightBookingAppState) => a[fromFlightBooking.flightBookingFeatureKey].flights,
  (a: fromFlightBooking.FlightBookingAppState) => a[fromFlightBooking.flightBookingFeatureKey].skipList,
  (flights, skipList) => flights.filter(f => !skipList.includes(f.id))
);