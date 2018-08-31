import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../shared/state/auth.state';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService) {
  }

  @Select(AuthState.token) token$: Observable<string>;

  ngOnInit() {
    this.token$.subscribe(t => {
      console.log('mother fucking: ', t);
    });
  }

public  debugStuff() {
  this.authService.testFunctions();
  }
}
