import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IEducationInfo } from '../../interface/IForm.interface';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnChanges {
  addEducation: boolean
  educationForm: FormGroup
  @Input() initData?: IEducationInfo[]
  @Output() formChange = new EventEmitter<FormGroup>()


  constructor(private fb: FormBuilder) {
    this.addEducation = false;
    this.educationForm = this.fb.group({
      educationList: this.fb.array([])
    });

    this.educationForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.educationForm);
    });
  }



  onClickAddEducation() {
    this.addEducation = !this.addEducation
    console.log(this.addEducation)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !this.initData) {

    }
  }
  get educationList() {
    return this.educationForm.get('educationList') as FormArray;
  }

  addEducationEntry() {
    const item = this.fb.group({ year: [""], university: [""] })
    this.educationList.push(item)
    console.log(this.educationList.value)
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
  onSubmit() {
    console.log(this.educationForm.value);
  }

}
