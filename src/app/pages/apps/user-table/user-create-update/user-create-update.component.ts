import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { UserSubject } from 'src/app/subjects/userDetail';
import { UsersData } from 'src/static-data/users';
import { DepartmentsData } from 'src/static-data/department';

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
  departmentsData: any = DepartmentsData;
  usersData: any = UsersData;
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
      active: ["true"],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      joiningDate: [null],
      relevingDate: [null],
      dob: [null],
      aadharNo: ['', Validators.required],
      gender: ['', Validators.required],
      department: [null, Validators.required],
      reportTo: [null]
    });
    if(data){
      this.form.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        active: data.active == "true" ? "true": "false",
        phone: data.phone,
        address: data.address,
        joiningDate: data.joiningDate,
        relevingDate: data.relevingDate,
        dob: data.dob,
        aadharNo: data.aadharNo,
        gender: data.gender,
        department: JSON.stringify(data.department),
        reportTo: JSON.stringify(data.reportTo)
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
      this.form.value['id'] = UsersData.length+1;
      UsersData.push(this.form.value);
      this.form.reset();
      this.router.navigate(['/apps/users']); 
    } else if (this.edit){
      UsersData.find(x=>x.id == this.recordId).firstName = this.form.value.firstName;
      UsersData.find(x=>x.id == this.recordId).lastName = this.form.value.lastName;
      UsersData.find(x=>x.id == this.recordId).email = this.form.value.email;
      UsersData.find(x=>x.id == this.recordId).active = this.form.value.active;
      UsersData.find(x=>x.id == this.recordId).phone = this.form.value.phone;
      UsersData.find(x=>x.id == this.recordId).address = this.form.value.address;
      UsersData.find(x=>x.id == this.recordId).joiningDate = this.form.value.joiningDate;
      UsersData.find(x=>x.id == this.recordId).relevingDate = this.form.value.relevingDate;
      UsersData.find(x=>x.id == this.recordId).dob = this.form.value.dob;
      UsersData.find(x=>x.id == this.recordId).aadharNo = this.form.value.aadharNo;
      UsersData.find(x=>x.id == this.recordId).gender = this.form.value.gender;
      UsersData.find(x=>x.id == this.recordId).department = +this.form.value.department;
      UsersData.find(x=>x.id == this.recordId).reportTo = +this.form.value.reportTo;
      this.form.reset();
      this.router.navigate(['/apps/users']); 
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
