import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {
  guideForm: FormGroup
  faCamera = faTimes;
  @Input() initData?: string[]
  @Output() formChange = new EventEmitter<FormGroup>()

  constructor(private fb: FormBuilder) {
    this.guideForm = this.fb.group({ guildList: this.fb.array([]) })
  }
  ngOnInit(): void {
    this.guideForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.guideForm);
    });
  }

  onDeleteGuild(index: number) {
    this.initData?.splice(index, 1)
  }

  get guildList() {
    return this.guideForm.controls['guildList'] as FormArray
  }

  addGuildEntry(): void {
    this.guildList.push(this.fb.group({ guildList: [''] }));
  }

  removeGuildEntry(index: number) {
    this.guildList.removeAt(index)
  }
}
