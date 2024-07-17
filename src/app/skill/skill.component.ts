import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  calScoreBar(rate: number | undefined): string {
    if (this.initData && rate) {
      const score = (rate * 10)
      console.log(score)
      return `${score}`
    }
    return `0`
  }
}
