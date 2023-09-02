import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { faBuilding, faBowlFood, faPersonDrowning, faMartiniGlassCitrus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/models/form';
import { Row } from 'src/app/models/row';
import { LogActions, LogState, selectWeeklyDataForUser } from 'src/app/state';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  @Input() day: number = 0;

  @Output() formValue = new EventEmitter<Form>();

  formGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    day: new FormControl<number | null>(null),
    office: new FormControl<boolean>(false),
    lunch: new FormControl<boolean>(false),
    swim: new FormControl<boolean>(false),
    aw: new FormControl<boolean>(false)
  })

  iconMap: { [key: string]: IconDefinition } = {
    office: faBuilding,
    lunch: faBowlFood,
    swim: faPersonDrowning,
    aw: faMartiniGlassCitrus
  };

  weekly: Row[] | null = null;

  constructor(private store: Store<LogState>) {
    this.store.select(selectWeeklyDataForUser).pipe(takeUntilDestroyed()).subscribe((weeklyData: Row[]) => {
      this.weekly = weeklyData;
      this.setFormValues();
    });
  }

  ngOnChanges() {
    this.setFormValues();
  }

  getClass(icon: string) {
    return this.formGroup.get(icon)?.value ? 'has-text-success' : 'has-text-danger';
  }

  get iconNames(): string[] {
    return Object.keys(this.iconMap);
  }

  setFormValues() {
    if (this.weekly) {
      const dayForUser = this.weekly?.find(row => row.day === this.day);
      const { id, office, lunch, swim, aw } = dayForUser ?? {};
      this.formGroup.patchValue({
        id: id ?? null,
        day: this.day,
        office: office ?? false,
        lunch: lunch ?? false,
        swim: swim ?? false,
        aw: aw ?? false
      });
    }
    
  }

  onClick(type: string) {
    this.formGroup.patchValue({ [type]: !this.formGroup.get(type)?.value });

    const rowToUpdate: Form = {
      id: this.formGroup.get('id')?.value ?? undefined,
      day: this.day,
      office: this.formGroup.get('office')?.value || false,
      lunch: this.formGroup.get('lunch')?.value || false,
      swim: this.formGroup.get('swim')?.value || false,
      aw: this.formGroup.get('aw')?.value || false
    };

    if (rowToUpdate?.id) {
      this.store.dispatch(LogActions.patchFormRow({rowToUpdate}));
    } else {
      this.store.dispatch(LogActions.createFormRow({rowToUpdate}))
    }
  }

}
