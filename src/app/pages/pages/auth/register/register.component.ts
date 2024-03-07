import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  form: UntypedFormGroup;
  apiPath: string = 'users';
  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private apiService: CommonApiService,
              private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  send() {
    delete this.form.value.passwordConfirm;
    this.apiService.add(this.form.value, this.apiPath).subscribe(
      (response) => {
        this.form.reset();
        this.snackbar.open(response.message, 'Close', {
          duration: 1000
        });
        this.router.navigate(['login']);
      },
      (error) => {
        this.snackbar.open(error, 'Close', {
          duration: 1000
        });
      }
    );
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
