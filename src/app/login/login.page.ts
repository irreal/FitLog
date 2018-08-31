import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login, AuthState } from '../shared/state/auth.state';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private taostCtl: ToastController
  ) {}
  public username = 'testuser';
  public password = 'secret';

  @Select(AuthState.token)
  token$: Observable<string>;
  @Select(AuthState.loginError)
  loginErrors$: Observable<any>;

  ngOnInit(): void {
    this.token$.subscribe(t => {
      if (t) {
        this.router.navigateByUrl(
          this.route.snapshot.queryParams['returnUrl'] || '/dashboard',
          { replaceUrl: true }
        );
      }
    });

    this.loginErrors$.subscribe(e => {
      if (e === undefined) {
        return;
      }
      this.taostCtl
        .create({
          message: 'Error loggin in. \n ' + e.error.error,
          duration: 2500,
          position: 'top'
        })
        .then(al => {
          al.present();
        });
    });
  }

  login() {
    this.store.dispatch(
      new Login({ username: this.username, password: this.password })
    );
  }
}
