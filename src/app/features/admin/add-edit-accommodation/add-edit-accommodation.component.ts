import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from '../../../core/services/accomodation.service';
import { Accommodation } from '../../../core/models/accommodation.model';

@Component({
  selector: 'app-add-edit-accommodation',
  templateUrl: './add-edit-accommodation.component.html',
  styleUrls: ['./add-edit-accommodation.component.css']
})
export class AddEditAccommodationComponent implements OnInit {
  accommodationForm: FormGroup;
  isEditMode = false;
  accommodationId: string | null = null;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.accommodationForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      maxGuests: [1, [Validators.required, Validators.min(1)]],
      availableFrom: ['', Validators.required],
      availableTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.paramMap.get('id');
    if (this.accommodationId) {
      this.isEditMode = true;
      this.loadAccommodationData();
    }
  }

  loadAccommodationData(): void {
    this.accommodationService.getAccommodationById(this.accommodationId!).subscribe(
      (accommodation: Accommodation) => {
        this.accommodationForm.patchValue(accommodation);
      }
    );
  }

  onSubmit(): void {
    if (this.accommodationForm.valid && this.imageFile) {
      const accommodationData: Accommodation = this.accommodationForm.value;
      
      if (this.isEditMode) {
        this.accommodationService.updateAccommodationWithImage(this.accommodationId!, accommodationData, this.imageFile)
          .subscribe(
            () => {
              this.router.navigate(['/admin']);
            },
            error => {
              console.error('Hiba a szállás frissítésekor:', error);
            }
          );
      } else {
        this.accommodationService.addAccommodationWithImage(accommodationData, this.imageFile)
          .subscribe(
            () => {
              this.router.navigate(['/admin']);
              this.accommodationForm.reset();
            },
            error => {
              console.error('Hiba a szállás hozzáadásakor:', error);
            }
          );
      }
    } else {
      console.error('Az űrlap érvénytelen vagy nincs kiválasztva kép');
    }
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }
}