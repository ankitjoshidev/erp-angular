import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Department } from '../interfaces/department.model';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { CommonApiService } from 'src/app/services/api.service';
import { UserSubject } from 'src/app/subjects/userDetail';
import { DepartmentsData } from 'src/static-data/department';

@Component({
  selector: 'vex-department-create-update',
  templateUrl: './department-create-update.component.html',
  styleUrls: ['./department-create-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUp400ms, stagger60ms]
})
export class DepartmentCreateUpdateComponent implements OnInit {

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
          this.router.navigate(['/apps/department']);
        }
      });
  }

  initForm(data: Department){
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
    if(data){
      this.form.patchValue({
        name: data.name,
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
      this.form.value['id'] = DepartmentsData.length+1;
      DepartmentsData.push(this.form.value);
      this.form.reset();
      this.router.navigate(['/apps/department']); 
    } else if (this.edit){
      DepartmentsData.find(x=>x.id == this.recordId).name = this.form.value.name;
      this.form.reset();
      this.router.navigate(['/apps/department']); 
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
    this.router.navigate(['/apps/department']);
  }
}
