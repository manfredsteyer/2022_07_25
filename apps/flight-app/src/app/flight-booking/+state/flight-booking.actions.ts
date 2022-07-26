import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const loadFlights = createAction(
  '[FlightBooking] loadFlights',  // Command
  props<{from: string, to: string, urgent: boolean}>()
);


export const flightsLoaded = createAction(
  '[FlightBooking] flightsLoaded',  // Event
  props<{flights: Flight[]}>()
);

export const updateFlight = createAction(
  '[FlightBooking] updateFlight',   // Command
  props<{flight: Flight}>()
);



