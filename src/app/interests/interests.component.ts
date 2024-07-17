import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent {
  interestForm: FormGroup
  faCamera = faTimes;
  @Input() initData?: string[]
  @Output() formChange = new EventEmitter<FormGroup>()
  constructor(private fb: FormBuilder) {
    this.interestForm = this.fb.group({ interestList: this.fb.array([]) })
  }

  ngOnInit(): void {
    this.interestForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.interestForm);
    });
  }

  onDeleteInterest(index: number) {
    this.initData?.splice(index, 1)
  }

  get interestList() {
    return this.interestForm.controls['interestList'] as FormArray
  }

  addInterestEntry(): void {
    this.interestList.push(this.fb.group({ interest: [''] }));
  }

  removeInterestEntry(index: number) {
    this.interestList.removeAt(index)
  }
}
