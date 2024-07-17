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
export class ExperienceComponent implements OnChanges {
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
    console.log(this.initData)
    this.experienceForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.experienceForm);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    changes
  }

  get experienceList() {
    return this.experienceForm.controls["experienceList"] as FormArray
  }

  calcHeight(): string {
    if (this.initData) {
      const itemCount = this.initData.length;
      const itemGap = 9;

      const totalHeight = (itemGap * (itemCount - 1));
      return `${totalHeight}rem`;
    }
    return `0rem`
  }

  addExperienceEntry(): void {
    const educationEntry = this.fb.group({
      formDate: [''],
      toDate: [''],
      experience: ['']
    });
    this.experienceList.push(educationEntry);
    this.experienceForm.value
  }

  removeExperienceEntry(index: number) {
    console.log(this.initData)
    if (this.initData) {
      console.log(index)
    } else {
      this.experienceList.removeAt(index)
    }
  }
}
