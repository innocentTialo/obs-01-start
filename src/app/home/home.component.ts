import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    /*this.firstObsSubscription = interval(1000).subscribe(
      ( value ) => {
        console.log(value);
      }
    );*/
    const customIntervalObservable: Observable<number> = Observable.create(
      observer => {
        let counter = 0;
        setInterval(() => {
          observer.next(counter++);
          if (counter === 1) {
            observer.complete();
          }
          if (counter > 1) {
            observer.error(new Error('counter is greater than 1!'));
          }
        }, 1000);
      }
    );

    this.firstObsSubscription = customIntervalObservable.pipe(filter(value => {
      return value > 0;
    }), map(value => {
      return 'Round: ' + value;
    })).subscribe((value) => {
      console.log(value);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
