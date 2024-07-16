import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IUserInfomation } from '../../interface/IForm.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  faCamera = faCamera;
  userForm: FormGroup
  position?: Array<string>
  fileCover: File | null = null;
  fileProfile: File | null = null
  imageCoverUrl?: string | ArrayBuffer | null | undefined;
  imageProfileUrl?: string | ArrayBuffer | null | undefined;
  initData?: IUserInfomation
  id?: string

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    if (this.id) {
      this.fetchUserData(this.id).then(result => {
        this.initData = result;
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }

    this.fetchDropdownPosition().then((v) => {
      console.log(v)
      this.position = v
    }).catch(error => console.log(error))
  }

  async fetchUserData(id: string): Promise<IUserInfomation> {
    try {
      const result = await axios.get<IUserInfomation>(`http://localhost:3000/user/${this.id}`)
      if (result.status == 200) {
        return result.data;
      }
      return result.data // need to add error page
    } catch (err) {
      console.error('Error fetching user data:', err);
      throw err;
    }
  }

  async fetchDropdownPosition() {
    try {
      const result = await axios.get('http://localhost:3000/user/position')
      console.log(result)
      if (result.status == 200) {
        return result.data
      }
      return result.data
    } catch (err) {
      throw err
    }
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

  async onSubmit() {
    console.log('post data to backend')
    console.log(this.userForm.value)
    await axios.post('http://localhost:3000/user', this.userForm.value)
  }


}
