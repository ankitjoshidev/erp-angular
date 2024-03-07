import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverService } from '../popover/popover.service';

@Component({
  selector: 'vex-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private popoverService: PopoverService
    ) { }

  ngOnInit(): void {
  }

  goToProfile(): void {
    this.popoverService.close();
    this.router.navigate(['apps/social']);
  }
  close(): void {
    this.authService.removeToken();
    this.popoverService.close();
    this.router.navigate(['login']);
  }
}
