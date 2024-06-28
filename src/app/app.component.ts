import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mortgage-calculator';

  form!:           FormGroup;
  showMessage:     boolean = false;
  monthlyMortgage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      principalLoanAmount: [0, [
        Validators.required
      ]],
      interestRate: [0, [
        Validators.required
      ]],
      lengthLoan: [0, [
        Validators.required
      ]]
    })
  }

  get principalLoanAmount() {
    return this.form.get('principalLoanAmount');
  }

  get interestRate() {
    return this.form.get('interestRate');
  }

  get lengthLoan() {
    return this.form.get('lengthLoan');
  }

  calculate() {
    if (this.form.valid) {
      const interestRateMonth = this.interestRate?.value * 0.01 / 12;
      const lenghtLoanMonths  = this.lengthLoan?.value * 12;
      const result = this.principalLoanAmount?.value * (interestRateMonth * Math.pow((1 + interestRateMonth), lenghtLoanMonths) / (Math.pow((1 + interestRateMonth), lenghtLoanMonths) - 1));
      this.monthlyMortgage = `$${new Intl.NumberFormat('en-US').format(Math.round(result))}`;
      this.showMessage = true;
    }
  }
}
