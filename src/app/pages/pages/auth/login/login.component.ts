import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;
  apiPath: string = 'signin';
  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private apiService: CommonApiService,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    if(this.form.value.email == 'admin@gmail.com' && this.form.value.password == '321321'){
        this.authService.setToken('abc');
        this.router.navigate(['']);
    }
    // this.apiService.add(this.form.value, this.apiPath).subscribe(
    //   (response) => {
    //     this.form.reset();
    //     this.authService.setToken(response.token);
    //     this.router.navigate(['']);
    //   },
    //   (error) => {
    //     this.snackbar.open(error, 'Close', {
    //       duration: 1000
    //     });
    //   }
    // );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
