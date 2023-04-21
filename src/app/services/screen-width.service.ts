import { Injectable } from '@angular/core';
import { Observable, Subject, filter, fromEvent, map, of } from 'rxjs';

//service that exposes a narrowerThan observable that emits a boolean
//whenever the screen width becomes wider or narrower than a specified category

export enum ScreenWidthCategories {
  Narrow_Mobile = 400,
  Mobile = 600,
  Tablet = 800,
  Narrow_Desktop = 1000,
  Desktop = 1200,
  Wide_Desktop = 1400
}

export class ScreenWidthState {
  public screenWidthCategory: ScreenWidthCategories | undefined;
  public narrowerThan: boolean | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthService {

  private currentScreenWidthStates: Array<ScreenWidthState> = [];
  private narrowerThanSubject: Subject<ScreenWidthState> = new Subject();

  constructor() {
    const resizeEvent = fromEvent(window, 'resize');
    resizeEvent.subscribe(event => this.checkScreenWidthCategories());
  }

  //an observale that returns the boolean of narrowerThan every time it changes
  public narrowerThan$(screenWidth: ScreenWidthCategories): Observable<boolean> {
    return this.narrowerThanSubject.asObservable()
      .pipe(filter(value => value.screenWidthCategory == screenWidth))
      .pipe(map(value => value.narrowerThan!))
  }

  //a boolean based on the current screen width
  public narrowerThan(screenWidth: ScreenWidthCategories):boolean {
    let currentStates = this.currentScreenWidthStates.filter(state => state.screenWidthCategory === screenWidth);
    if(currentStates.length != 1){
      this.checkScreenWidthCategory(screenWidth);
      currentStates = this.currentScreenWidthStates.filter(state => state.screenWidthCategory === screenWidth);
    }
    return (currentStates[0].narrowerThan || false); 
  }

  //check for updates in every screen width category
  private checkScreenWidthCategories() {
    for (const screenWidthCategory in ScreenWidthCategories) {
      this.checkScreenWidthCategory(Number(ScreenWidthCategories[screenWidthCategory]));
    }
  }

  //check for updates in a single screen width category, and emit a next value if changed
  private checkScreenWidthCategory(screenWidthCategory: ScreenWidthCategories) {
    const currentState: boolean | undefined = this.currentlyNarrowerThan(screenWidthCategory);
    let newState: ScreenWidthState | undefined;
    if (window.innerWidth < screenWidthCategory && (currentState === false || currentState === undefined)) {
      newState = { "screenWidthCategory": screenWidthCategory, "narrowerThan": true }
    } else if (window.innerWidth > screenWidthCategory && (currentState === true || currentState === undefined)) {
      newState = { "screenWidthCategory": screenWidthCategory, "narrowerThan": false }
    }

    if (newState != undefined) {
      this.updateCurrentState(newState);
      this.narrowerThanSubject.next(newState);
    }
  }

  //return a value from the cache of current ScreenWidthStates
  private currentlyNarrowerThan(screenWidthCategory: ScreenWidthCategories): boolean | undefined {
    let screenWidthState = this.currentScreenWidthStates.filter(state => state.screenWidthCategory == screenWidthCategory);
    if (screenWidthState.length == 1) {
      return screenWidthState[0].narrowerThan;
    }
    return undefined;
  }

  //update the cache of current ScreenWidthStates
  private updateCurrentState(newState: ScreenWidthState) {
    let newStates = this.currentScreenWidthStates.filter(currentState => currentState.screenWidthCategory != newState.screenWidthCategory);
    newStates.push(newState);
    this.currentScreenWidthStates = newStates;
  }

}
