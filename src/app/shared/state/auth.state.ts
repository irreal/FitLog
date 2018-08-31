import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export class AuthStateModel {
    token?: string;
    username?: string;
    loginError?: any;
  }
  ​
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string, password: string }) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  @State<AuthStateModel>({
    name: 'auth'
  })
  export class AuthState {
  ​
    @Selector()
    public static token(state: AuthStateModel) { return state.token; }

    @Selector()
    public static loginError(state: AuthStateModel) { return state.loginError; }
  ​
    constructor(private authService: AuthService) {}
  ​
    @Action(Login)
    async login({patchState}: StateContext<AuthStateModel>) {
      try {
      const username = await this.authService.login();
      patchState({token: username});
      } catch (err) {
      patchState({ loginError: err});
      }
    }

    @Action(Logout)
    async logout({ setState }: StateContext<AuthStateModel>) {
      await this.authService.logout();
      setState({});
    }
  }
