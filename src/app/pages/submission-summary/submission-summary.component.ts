import { Component, OnInit, inject } from '@angular/core';
import { NgFor, formatDate } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { RouterLink } from '@angular/router';

type SummaryItem = { label: string; value: string | number | null };

@Component({
  selector: 'app-submission-summary',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './submission-summary.component.html',
  styles: ``
})
export class SubmissionSummaryComponent implements OnInit {
  private countryService = inject(CountryService);

  items: SummaryItem[] = [];

  private readonly LABELS: Record<string, string> = {
    birthDate: 'Geburtsdatum',
    address  : 'Adresse',
    zip      : 'PLZ',
    city     : 'Ort',
    country  : 'Land',
  };

  async ngOnInit(): Promise<void> {
    const data = history.state?.formData ?? {};

    // Zusammenstellung des Namens
    const name = [data.salutation, data.firstName, data.lastName]
      .filter(Boolean)
      .join(' ');
    this.items.push({ label: 'Name', value: name || '—' });


    for (const key of Object.keys(this.LABELS)) {
      let val = data[key] ?? null;

      if (key === 'birthDate' && val) {
        val = formatDate(val, 'dd.MM.yyyy', 'de-DE');
      }

      if (key === 'country' && val) {
        val = await this.countryService.lookupName(val);
      }

      this.items.push({ label: this.LABELS[key], value: val });
    }
  }
}
