import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { UserSubject } from 'src/app/subjects/userDetail';

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUp400ms, stagger60ms]
})
export class UserCreateUpdateComponent implements OnInit {

  static id = 100;
  mode: 'create' | 'update' = 'create';
  form: UntypedFormGroup;
  apiPath: string = 'users';
  recordId: number;
  add: boolean=false;
  edit: boolean=false;
  constructor(private fb: UntypedFormBuilder, private router: Router, private apiService: CommonApiService,
    private userSubject: UserSubject) {
      this.userSubject.getUserDetails().subscribe((user) => {
        if(user?.action){
          if(user?.action == 'edit'){
            this.initForm(user.data);
          } else {
            this.initForm(null);
          }
        } else {
          this.router.navigate(['/apps/users']);
        }
      });
  }

  initForm(data: User){
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      registered: [true, Validators.required],
      active: ["true"]
    });
    if(data){
      this.form.patchValue({
        email: data.email,
        registered: data.registered,
        active: data.active ? "true": "false",
        firstName: data.firstName,
        lastName: data.lastName
      });
      this.recordId = data.id;
      this.edit = true;
    } else {
      this.add = true;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.invalid){
      return false;
    }
    if(this.add){
      this.apiService.add(this.form.value, this.apiPath).subscribe(
        (response) => {
          this.form.reset();
          this.router.navigate(['/apps/users']); 
          console.log('API response:', response);
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    } else if (this.edit){
      this.apiService.update(this.recordId, this.form.value, this.apiPath).subscribe(
        (response) => {
          this.form.reset();
          this.router.navigate(['/apps/users']); 
          console.log('API response:', response);
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }

  createCustomer() {
  }

  updateCustomer() {
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  cancel() {
    this.router.navigate(['/apps/users']);
  }
}
