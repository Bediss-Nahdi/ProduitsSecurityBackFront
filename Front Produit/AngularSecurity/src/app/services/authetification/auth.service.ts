import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  /* users: User[] = [{ "username": "admin", "password": "123", "roles": ['ADMIN'] },
  { "username": "bédiss", "password": "123", "roles": ['USER'] }]; */

  public loggedUser: string = ""; // une fois que l'utilisateur a réussi à se connecter on le stock dans loggedUser
  public isloggedIn: Boolean = false; // si l'utilisateur est connecté alors isloggedIn:true
  public roles: string[] = [];

  token: any;

  users :any = new User();

  private helper = new JwtHelperService();





  apiURL: string = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }
  getToken(): string {
    return this.token;
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  getUserFromDB(username: string): Observable<User> {
    const url = `${this.apiURL}/${username}`;
    return this.http.get<User>(url);
  }



  /*  //1// Vérifie si le mot de passe est coorecte ou pas 
  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  /* Vérifie si l'utilisateur est admin 
  isAdmin(): Boolean {
    if (!this.roles) //this.roles== undefiened{}{}
      return false;
    else
      return (this.roles.indexOf('ADMIN') > -1);
  }*/

  /* deconnection */
  logout() {
    this.loggedUser;
    this.roles;
    this.token;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }
  /*  */

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }
  getUserRoles(username: string) {
    this.users.forEach((curUser:any) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }




}