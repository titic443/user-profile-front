import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ISkillInfo } from '../../interface/IForm.interface';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {
  @Input() initData?: ISkillInfo[]

  calScoreBar(rate: number | undefined): string {
    if (this.initData && rate) {
      const score = (rate * 10)
      console.log(score)
      return `${score}`
    }
    return `0`
  }
}
