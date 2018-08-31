import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../shared/state/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private store: Store) {
  }

  @Select(AuthState.token) token$: Observable<string>;

  ngOnInit() {
    this.token$.subscribe(t => {
      console.log('mother fucking: ', t);
    });
  }

public  debugStuff() {
    debugger;
    this.store.selectSnapshot(s => {
      console.log('mother fucking snapshot: ', s);
    });
  }


}
