import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IEducationInfo, IExperienceInfo, IUserInfomation } from '../../interface/IForm.interface';
import { ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { EducationComponent } from '../education/education.component';
import { ExperienceComponent } from "../experience/experience.component";
import { SkillComponent } from "../skill/skill.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule, ContactComponent, EducationComponent, ExperienceComponent, SkillComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  faCamera = faCamera;
  userForm: FormGroup
  position?: Array<string>
  // location?: Record<string, Record<string, string>>
  fileCover: File | null = null;
  fileProfile: File | null = null
  imageCoverUrl?: string | ArrayBuffer | null | undefined;
  imageProfileUrl?: string | ArrayBuffer | null | undefined;
  initData?: IUserInfomation
  id?: string
  contactForm: FormGroup;
  educationForm: FormGroup;
  experienceForm: FormGroup;

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
    this.contactForm = this.fb.group({})
    this.educationForm = this.fb.group([])
    this.experienceForm = this.fb.group([])
  }



  location?: Record<string, Record<string, string>>
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    if (this.id) {
      this.fetchUserData(this.id).then(result => {
        this.initData = result;
        console.log(this.initData)
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      this.fetchDropdownPosition().then((v) => {
        this.position = v
      }).catch(error => console.log(error))
      this.fetchDropdownLocation().then((v) => {
        this.location = v
        console.log(this.location)
      }).catch(error => console.log(error))
    }
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
      if (result.status == 200) {
        return result.data
      }
      return result.data
    } catch (err) {
      throw err
    }
  }

  async fetchDropdownLocation() {
    try {
      const result = await axios.get('http://localhost:3000/user/location')
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

  onContactFormChange(contactForm: FormGroup): void {
    this.contactForm = contactForm
  }

  onEducationFormChange(educationForm: FormGroup): void {
    this.educationForm = educationForm
  }

  onExperienceFormChange(experienceForm: FormGroup): void {
    this.experienceForm = experienceForm
  }

  async onSubmit() {
    const educationList = this.educationForm?.value['educationList']
    const experienceList = this.experienceForm?.value['experienceList']
    const combineData = {
      ...this.userForm.value,
      contactInfo: { ...this.contactForm.value },
      educationInfo: Array.isArray(educationList) ? [...educationList] : [],
      experienceInfo: Array.isArray(experienceList) ? [...experienceList] : [],
    }
    console.log(combineData)
    await axios.post('http://localhost:3000/user', combineData)
  }
}
