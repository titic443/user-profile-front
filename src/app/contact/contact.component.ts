import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IContactInfo } from '../../interface/IForm.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnChanges {
  @Output() formChange = new EventEmitter<FormGroup>()
  @Input() initData?: IContactInfo
  @Input() initLocation?: Record<string, Record<string, string>>
  contactForm: FormGroup
  subdistrictArr?: string[]
  district?: string | undefined
  districtArr?: string[]
  province?: string | undefined
  provinceArr?: string[]
  postalCode?: string | undefined
  postalCodeArr?: string[]


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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !this.initData) {
      this.initLocation = changes['initLocation']['currentValue']
      this.subdistrictArr = Object.keys(changes['initLocation']['currentValue'])
      console.log(changes['initLocation']['currentValue'])
    }
  }
  onSubdistrictChange(event: Event): void {
    const selectElement = (event.target as HTMLSelectElement).value
    if (selectElement && this.initLocation) {
      this.district = this.initLocation[selectElement]['district']
      this.province = this.initLocation[selectElement]['province']
      this.postalCode = this.initLocation[selectElement]['postalCode']
    }
  }
}
