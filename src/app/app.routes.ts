import { Routes } from '@angular/router';
import { SubmissionSummaryComponent } from './pages/submission-summary/submission-summary.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    { path: '',        component: FormComponent },
    { path: 'summary', component: SubmissionSummaryComponent },
    { path: '**', redirectTo: '' }
];
