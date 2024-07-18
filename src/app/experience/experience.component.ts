import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IExperienceInfo, IUserInfomation } from '../../interface/IForm.interface';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faCancel, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experienceForm: FormGroup
  faCamera = faTimes;
  initExperience?: IExperienceInfo[]
  @Output() formChange = new EventEmitter<FormGroup>()
  @Input() initData?: IExperienceInfo[]

  constructor(private fb: FormBuilder) {
    this.experienceForm = this.fb.group({
      experienceList: this.fb.array([])
    })
  }

  ngOnInit(): void {
    console
    this.experienceForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.experienceForm);
    });
  }



  get experienceList() {
    return this.experienceForm.controls["experienceList"] as FormArray
  }



  addExperienceEntry(): void {
    const educationEntry = this.fb.group({
      fromDate: [''],
      toDate: [''],
      experience: ['']
    });
    this.experienceList.push(educationEntry);
    this.experienceForm.value
  }

  removeExperienceEntry(index: number) {
    this.experienceList.removeAt(index)
  }
}
