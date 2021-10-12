import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../services/authetification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();

  err: number = 0;
  jwToken: string ="";

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
 

  /* Outil de test */
  onLoggedin() {
    this.authService.login(this.user).subscribe(data => {
      this.jwToken = data.headers.get('Authorization');
      this.authService.saveToken(this.jwToken);
      this.router.navigate(['/']);
    }, (err) => {
      this.err = 1;
    });
  }



}
