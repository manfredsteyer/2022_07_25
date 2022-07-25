import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { interval, Observable, startWith, distinctUntilChanged, combineLatest, BehaviorSubject, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { catchError, concatMap, debounceTime, delay, exhaustMap, filter, map, mergeMap, share, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})

export class FlightLookaheadComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    control!: FormControl;
    flights$!: Observable<Flight[]>;
    // loading = false;
    loading$ = new BehaviorSubject<boolean>(false);

    online$!: Observable<boolean>;

    ngOnInit() {
        this.control = new FormControl();

        this.online$ = interval(2000).pipe(
            startWith(0),
            map(() => Math.random() < 0.5), // t, t, f, f, t
            map(() => true),
            distinctUntilChanged(), // t, f, t
            // share(),
            shareReplay({ bufferSize: 1, refCount: true })
        );

        const input$ = this.control.valueChanges.pipe(
            filter(v => v.length >= 3),
            debounceTime(300),
        );

        // RxJS 7 (>= Angular 13)
        this.flights$ = combineLatest({input: input$, online: this.online$}).pipe(
            filter(combined => combined.online),
            tap(() => this.loading$.next(true)), 
            
            switchMap(combined => this.load(combined.input)),

            tap(() => this.loading$.next(false)) 
        );

        // this.flights$ = input$.pipe(
        //     withLatestFrom(this.online$), // Passiv!
        //     filter( ([, online]) => online),
        //     tap(() => this.loading = true),  // TODO: Get rid of this
        //     switchMap( ([input,]) => this.load(input)),
        //     tap(() => this.loading = false) // TODO: Get rid of this
        // );


        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       tap(v => this.loading = true),
        //                       switchMap(name => this.load(name)),
        //                       tap(v => this.loading = false)
        //                     );
    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            // delay(7000)
            catchError(err => {
                console.error('err', err);
                return of([]);
            }),            
        );

    };


}
