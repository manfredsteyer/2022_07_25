import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Flight, FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectFlights, selectFlights2 } from '../+state/flight-booking.selectors';
 
@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;


  flights$ = this.store.select(selectFlights2)

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<FlightBookingAppState>) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));

  }

  delay(): void {
    // this.flightService.delay();

    this.flights$.pipe(first()).subscribe(flights => {

      const newFlight: Flight = this.delayFirstFlight(flights);
      this.store.dispatch(updateFlight({flight: newFlight}));

    });


  }


  private delayFirstFlight(flights: Flight[]) {
    const oldFlight = flights[0];
    const oldDate = new Date(oldFlight.date);
    const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
    const newFlight: Flight = { ...oldFlight, date: newDate.toISOString() };
    return newFlight;
  }
}
