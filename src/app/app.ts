import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Verificar el estado de autenticación al iniciar la app
    this.authService.checkAuthStatus();
  }
}
