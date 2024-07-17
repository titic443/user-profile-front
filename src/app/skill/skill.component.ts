import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      skillList: this.fb.array([])
    })
  }

  get skillList() {
    return this.skillForm.controls['skillList'] as FormArray
  }

  ngOnInit(): void {
    console
    this.skillForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.skillForm);
    });
  }


  addSkillEntry() {
    const skill = this.fb.group({
      skill: [''],
      rate: [0]
    })
    this.skillList.push(skill)
    console.log(this.skillList.value)
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
}
