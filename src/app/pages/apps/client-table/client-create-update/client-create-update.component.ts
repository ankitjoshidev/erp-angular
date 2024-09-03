import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Client } from '../interfaces/client.model';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { UserSubject } from 'src/app/subjects/userDetail';
import { ClientsData } from 'src/static-data/client';

@Component({
  selector: 'vex-client-create-update',
  templateUrl: './client-create-update.component.html',
  styleUrls: ['./client-create-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUp400ms, stagger60ms]
})
export class ClientCreateUpdateComponent implements OnInit {

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
          this.router.navigate(['/apps/clients']);
        }
      });
  }

  initForm(data: Client){
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      active: ["true"],
    });
    if(data){
      this.form.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        active: data.active == "true" ? "true": "false"
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
    debugger
    if(this.form.invalid){
      return false;
    }
    if(this.add){
      this.form.value['id'] = ClientsData.length+1;
      ClientsData.push(this.form.value);
      this.form.reset();
      this.router.navigate(['/apps/clients']); 
    } else if (this.edit){
      ClientsData.find(x=>x.id == this.recordId).firstName = this.form.value.firstName;
      ClientsData.find(x=>x.id == this.recordId).lastName = this.form.value.lastName;
      ClientsData.find(x=>x.id == this.recordId).email = this.form.value.email;
      ClientsData.find(x=>x.id == this.recordId).active = this.form.value.active;
      this.form.reset();
      this.router.navigate(['/apps/clients']); 
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
    this.router.navigate(['/apps/clients']);
  }
}
