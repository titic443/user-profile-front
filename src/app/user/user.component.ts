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
import { InterestsComponent } from '../interests/interests.component';
import { GuideComponent } from "../guide/guide.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule, ContactComponent, EducationComponent, ExperienceComponent, SkillComponent, InterestsComponent, GuideComponent],
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
  skillForm: FormGroup;
  interestForm: FormGroup;
  guildForm: FormGroup
  requestBody: FormData


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
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
    this.skillForm = this.fb.group([])
    this.interestForm = this.fb.group([])
    this.guildForm = this.fb.group([])
    this.requestBody = new FormData()

  }



  location?: Record<string, Record<string, string>>
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    if (this.id) {
      console.log(this.id)
      this.fetchUserData(this.id).then(result => {
        this.initData = result;
        console.log(this.initData)
        if (this.initData.profilePic && this.initData.coverPic) {
          this.getImage(this.initData.profilePic).then((v) => this.imageProfileUrl = v)
          this.getImage(this.initData.coverPic).then((v) => this.imageCoverUrl = v)
        }
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

  async getImage(filename: string): Promise<any> {
    try {
      console.log('call')
      const result = await axios.get('http://localhost:3000/user/image/' + filename, { headers: { "Content-Type": "image/jpeg" } })

      return result.data
      // console.log(result.data)
      // const imageBase64 = Buffer.from(result.data, 'binary').toString('base64');
      // console.log(imageBase64)
      // return 'data:image/jpeg;base64,' + imageBase64;
    } catch (err) {
      console.log(err)
    }
  }

  async fetchUserData(id: string): Promise<IUserInfomation> {
    try {
      const result = await axios.get<IUserInfomation>(`http://localhost:3000/user/${this.id}`, { headers: { "Content-Type": "application/json" } })
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
      // const formData = new FormData();
      this.requestBody.append('coverImage', file, file.name);
      // this.uploadFile(formData);
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
        // }
        // const formData = new FormData();
        this.requestBody.append('profileImage', file, file.name);
        // this.uploadFile(formData);
      }
      this.fileProfile = file
    }
  }

  private async uploadFile(formData: FormData) {
    await axios.post('http://localhost:3000/user/upload', formData)
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
  onSkillFormChange(skillForm: FormGroup): void {
    this.skillForm = skillForm
  }

  onInterestChange(interest: FormGroup): void {
    this.interestForm = interest
  }

  onGuildChange(guild: FormGroup): void {
    this.guildForm = guild
  }

  resetForms(): void {
    this.userForm.reset();
    this.contactForm.reset();
    this.educationForm.reset();
    this.experienceForm.reset();
    this.skillForm.reset();
    this.interestForm.reset();
    this.guildForm.reset();
    this.fileCover = null;
    this.fileProfile = null;
    this.imageCoverUrl = null;
    this.imageProfileUrl = null;
    this.requestBody = new FormData();
  }

  async onSubmit() {
    try {

      const educationList = this.educationForm?.value['educationList']
      const experienceList = this.experienceForm?.value['experienceList']
      const skillList = this.skillForm?.value['skillList']
      const interestList = this.interestForm?.value['interestList']
      const guildList = this.guildForm?.value['guildList']
      console.log(guildList)
      const combineData = {
        ...this.userForm.value,
        contactInfo: { ...this.contactForm.value },
        educationInfo: Array.isArray(educationList) ? [...educationList] : [],
        experienceInfo: Array.isArray(experienceList) ? [...experienceList] : [],
        skillInfo: Array.isArray(skillList) ? [...skillList] : [],
        interestInfo: Array.isArray(interestList) ? interestList.map(v => v['interest']) : [],
        guildInfo: Array.isArray(guildList) ? guildList.map(v => v["guildList"]) : []
      }
      for (const key in combineData) {
        const value = combineData[key];
        if (Array.isArray(value)) {
          this.requestBody.append(key, JSON.stringify(value));
        } else if (key === 'contactInfo') {
          this.requestBody.append(key, JSON.stringify(value));
        } else {
          this.requestBody.append(key, value);
        }
      }

      console.log(combineData)
      console.log(this.requestBody)
      await axios.post('http://localhost:3000/user/upload', this.requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.resetForms()
    } catch (err) {
      this.resetForms()
    }
  }

}
