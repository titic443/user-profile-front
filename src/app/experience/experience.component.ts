import { Component } from '@angular/core';
import { IExperienceInfo, IUserInfomation } from '../../interface/IForm.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  initData?: IExperienceInfo[]

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
