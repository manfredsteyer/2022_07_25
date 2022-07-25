/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { share } from 'rxjs/operators';


// function createDummyObservable() {
  
//   return new Observable<string>((observer: Observer<string>) => {
    
//     let currentValue = 0;
//     const handle = setInterval(() => {
//       console.debug('sending next value', currentValue);
//       observer.next('' + Math.round(Math.random() * 1000))
//       currentValue++;
//     }, 1000);

//     return () => {
//       console.debug('cleaning up');
//       clearInterval(handle);
//     };
    
//     // observer.next('A');
//     // observer.next('B');
//     // observer.next('C');

//     // observer.complete();

//   });

// }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  _userName = '';

  get userName(): string {
    return this._userName;
  }

  constructor(private route: ActivatedRoute) {}

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {

    // const shared$ = createDummyObservable().pipe(share());

    // const sub = shared$.subscribe({
    //   next: (nextValue) => {
    //     console.debug('next value for A', nextValue)
    //   },
    //   error: (err) => {
    //     console.error('err', err);
    //   },
    //   complete: () => {
    //     console.debug('complete');
    //   }
    // });

    // const sub2= shared$.subscribe({
    //   next: (nextValue) => {
    //     console.debug('next value for B', nextValue)
    //   },
    //   error: (err) => {
    //     console.error('err', err);
    //   },
    //   complete: () => {
    //     console.debug('complete');
    //   }
    // });

    // const sub3 = shared$.subscribe({
    //   next: (nextValue) => {
    //     console.debug('next value for C', nextValue)
    //   },
    //   error: (err) => {
    //     console.error('err', err);
    //   },
    //   complete: () => {
    //     console.debug('complete');
    //   }
    // });

    // setTimeout(() => {
    //   sub.unsubscribe();
    //   sub2.unsubscribe();
    //   sub3.unsubscribe();
    // }, 6000);


    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }
}
