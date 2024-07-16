import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  faCamera = faCamera;
  userForm: FormGroup
  fileCover: File | null = null;
  fileProfile: File | null = null
  imageCoverUrl?: string | ArrayBuffer | null | undefined;
  imageProfileUrl?: string | ArrayBuffer | null | undefined;

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

  onFileCoverSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: any) => {
        this.imageCoverUrl = e.target?.result
      }
    }
    this.fileCover = file
  }

  onFileProfileSelected(event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: any) => {
        this.imageProfileUrl = e.target?.result
      }
    }
    this.fileProfile = file
  }


}
