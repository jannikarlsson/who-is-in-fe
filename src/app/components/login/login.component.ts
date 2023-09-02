import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LogActions, LogState } from 'src/app/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>('')
  })

  constructor(private store: Store<LogState>) {}

  onSubmit() {
    const formValue = this.loginForm.value;
    if (formValue.username !== null && formValue.password !== null) {
      const typedFormValue: { username: string; password: string } = formValue as { username: string; password: string };
      this.store.dispatch(LogActions.login(typedFormValue));
    } else {
      console.error('Invalid form values');
    }
  }

}
