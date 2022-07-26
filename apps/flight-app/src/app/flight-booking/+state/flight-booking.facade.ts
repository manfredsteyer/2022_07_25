import { Injectable } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { selectFlights } from './flight-booking.selectors';

// -- 4 --
@Injectable({providedIn: 'root'})
export class FlightBookingFacade {

    readonly flights$ = this.store.select(selectFlights);
    // loading$: Observable<boolean>;
    
    constructor(
        private store: Store<FlightBookingAppState>) {
    }

    load(from: string, to: string): void {
        this.store.dispatch(loadFlights({from, to, urgent: false}));
    }

}


// -- 3 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$ = this.store.select(selectFlights);
//     // loading$: Observable<boolean>;
    
//     constructor(
//         private store: Store<FlightBookingAppState>,
//         private flightService: FlightService) {
//     }

//     load(from: string, to: string): void {
//         this.flightService.find(from, to).subscribe(
//             (flights) => {

//                 //this.flightsSubject.next(flights);
//                 this.store.dispatch(flightsLoaded({flights}));
//             }
//         )
//     }

// }

// -- 2 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$ = this.store.select(a => a[flightBookingFeatureKey].flights);
//     // loading$: Observable<boolean>;
    
//     constructor(
//         private store: Store<FlightBookingAppState>,
//         private flightService: FlightService) {
//     }

//     load(from: string, to: string): void {
//         this.flightService.find(from, to).subscribe(
//             (flights) => {

//                 //this.flightsSubject.next(flights);
//                 this.store.dispatch(flightsLoaded({flights}));
//             }
//         )
//     }

// }

// // -- 1 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     private flightsSubject = new BehaviorSubject<Flight[]>([]);
//     readonly flights$ = this.flightsSubject.asObservable();
//     // loading$: Observable<boolean>;
    
//     constructor(private flightService: FlightService) {
//     }

//     load(from: string, to: string): void {
//         this.flightService.find(from, to).subscribe(
//             (flights) => {

//                 this.flightsSubject.next(flights);

//             }
//         )
//     }

// }