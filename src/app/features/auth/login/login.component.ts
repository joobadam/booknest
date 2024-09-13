import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await this.authService.signIn(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        );
        this.router.navigate(['/']);
      } catch (err) {
        this.error = 'Hibás email cím vagy jelszó. Kérjük, próbálja újra.';
        console.error('Bejelentkezési hiba:', err);
      }
    }
  }
}