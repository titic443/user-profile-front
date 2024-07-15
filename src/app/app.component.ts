import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'user-profile';
  faCoffee = faCoffee;
  userForm: FormGroup


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      nickname: [''],
      firstname: [''],
      lastname: [''],
      position: [''],
      nationality: [''],
      tel: [''],
      startDate: ['']
    });
  }

  ngOnInit(): void { }


  onSubmit(): void {
    console.log(this.userForm.value);
  }
}
