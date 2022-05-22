import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
}
