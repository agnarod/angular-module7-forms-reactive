import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;

  forbiddenUsernames = ['Chris', 'Ana'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value)=> {console.log(value);}
      
    // );
    this.signupForm.statusChanges.subscribe(
      (value)=> {console.log(value);}
      
    );
    const hob: FormArray = new FormArray([...[
      'riding',
      'biking',
      'reading'].map(item => new FormControl(item))]
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Frank',
        'email': 'frank@gmail.com'
      },
      'gender':'male',
      'hobbies':[]
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Jhonny'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) != -1) {
      return { 'forbidden': true };
    }
    return null;
  }
  
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>(
      (resolve, reject)=>{
        setTimeout(()=>{
          if(control.value == 'test@test.com'){
            resolve({'emailForbidden': true});
          }
          else{
            resolve(null)
          }
        },1500)
      }
    )
    return promise;
  }
}
