import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IContactInfo } from '../../interface/IForm.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() formChange = new EventEmitter<FormGroup>()
  @Input() initData?: IContactInfo
  contactForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      address: [''],
      subdistrict: [''],
      district: [''],
      province: [''],
      postalCode: [''],
      facebook: [''],
      lineId: [''],
      instagram: ['']
    })
  }

  ngOnInit(): void {
    this.contactForm.valueChanges.subscribe(() => {
      this.formChange.emit(this.contactForm);
    });
  }
}
