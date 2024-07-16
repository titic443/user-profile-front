import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { IEducationInfo } from '../../interface/IForm.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  addEducation: boolean = false;
  educationForm: FormGroup;
  @Input() initData?: IEducationInfo[];
  @Output() formChange = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      educationList: this.fb.array([])
    })
  }

  get educationList() {
    return this.educationForm.controls["educationList"] as FormArray
  }

  ngOnInit(): void {
    this.educationForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.educationForm);
    });
  }

  addEducationEntry(): void {
    const educationEntry = this.fb.group({
      year: [''],
      university: ['']
    });
    this.educationList.push(educationEntry);
    this.educationForm.value
  }

  removeEducationEntry(index: number) {
    this.educationList.removeAt(index)
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
}
