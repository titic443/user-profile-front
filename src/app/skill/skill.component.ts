import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ISkillInfo } from '../../interface/IForm.interface';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {
  skillForm: FormGroup
  @Input() initData?: ISkillInfo[]
  @Output() formChange = new EventEmitter<FormGroup>();
  @Output() hasError = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      skillList: this.fb.array([])
    })
  }

  get skillList() {
    return this.skillForm.controls['skillList'] as FormArray
  }

  ngOnInit(): void {
    this.skillForm.valueChanges.subscribe(() => {
      const err = this.skillList.controls.find((v) => v.getRawValue()['rate'] > 10)
      if (err) {
        this.hasError.emit(true)
      }
      this.formChange.emit(this.skillForm);
    });
  }



  addSkillEntry() {
    const skill = this.fb.group({
      skill: [''],
      rate: [0]
      // rate: [0, [Validators.required, this.maxValidator(10)]]
    })
    this.skillList.push(skill)
  }

  removeSkillEntry(index: number) {
    this.skillList.removeAt(index)
  }


  calScoreBar(rate: number | undefined): string {
    if (this.initData && rate) {
      const score = (rate * 10)
      console.log(score)
      return `${score}`
    }
    return `0`
  }

  maxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      return value > max ? { 'max': { value: max } } : null;
    };
  }
}



