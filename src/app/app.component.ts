import { Component } from '@angular/core';
import { LogState, selectIsLoggedIn } from './state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'who-is-in-fe';

  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store<LogState>) {}
}
