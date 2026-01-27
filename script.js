// Theme Toggle Functionality

// Get the theme toggle button
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  // Get current theme
  const theme = document.documentElement.getAttribute('data-theme');

  // Switch theme
  const newTheme = theme === 'dark' ? 'light' : 'dark';

  // Apply new theme
  document.documentElement.setAttribute('data-theme', newTheme);

  // Save preference to localStorage
  localStorage.setItem('theme', newTheme);
});


// Calculator Functionality

const PERSONAL_ALLOWANCE_LIMIT = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const PERSONAL_ALLOWANCE_THRESHOLD = 100000;

const PERSONAL_ALLOWANCE_RATE_PERCENTAGE = 0;
const BASIC_RATE_PERCENTAGE = 20;
const HIGHER_RATE_PERCENTAGE = 40;
const ADDITIONAL_RATE_PERCENTAGE = 45;

const NI_BASIC_RATE_PERCENTAGE = 8;
const NI_HIGHER_RATE_PERCENTAGE = 2;

const PLAN_124_TAX_RATE = 9;
const POSTGRAD_TAX_RATE = 6;

const PLAN_1_THRESHHOLD = 26065;
const PLAN_2_THRESHHOLD = 28470;
const PLAN_4_THRESHHOLD = 32745;
const PLAN_POSTGRAD_THRESHHOLD = 21000;

//Inputs - Gross salary, Pension contribution % etc
document.getElementById('gross_salary_input').oninput = function(){
  gross_salary = document.getElementById('gross_salary_input').value;
  updateAllCalculations();
}

document.getElementById('pension_contribution_input').oninput = function(){
  pension_contribution_percentage = document.getElementById('pension_contribution_input').value;
  updateAllCalculations();
}



function updateAllCalculations() {

  const salaryInput = document.getElementById('gross_salary_input');
  const pensionInput = document.getElementById('pension_contribution_input');
  const sfDropdown = document.getElementById('sf_dropdown');

  const gross_salary = salaryInput.value;
  const pension_contribution_percentage = pensionInput.value;
  const sfInput = sfDropdown.value;

  // Reset errors
  salaryInput.classList.remove('error');
  pensionInput.classList.remove('error');
  sfDropdown.classList.remove('error');

  hasError = false;

  if (!gross_salary) {
    salaryInput.classList.add('error');
    hasError = true;
  }

  if (!pension_contribution_percentage) {
    pensionInput.classList.add('error');
    hasError = true;
  }

  if (!sfInput) {
    sfDropdown.classList.add('error');
    hasError = true;
  }

  //Validation to show - if any of the 2 inputs are left blank. Otherwise it displays NaN error
  if (hasError) {
    document.getElementById('annual_pension_contribution').textContent = '£ ~';
    document.getElementById('monthly_pension_contribution').textContent = '£ ~';
    document.getElementById('gross_income_minus_pension').textContent = '£ ~';
    document.getElementById('personal_allowance_rule').textContent = '£ ~';
    document.getElementById('personal_allowance_deduction').textContent = '£ ~';
    document.getElementById('applicable_tax_rate').textContent = '~';
    document.getElementById('personal_allowance').textContent = '£ ~';

    document.getElementById('basic_rate_taxable_income').textContent = '£ ~';
    document.getElementById('basic_rate_taxable_pay').textContent = '£ ~';

    document.getElementById('additional_rate_taxable_income').textContent = '£ ~';
    document.getElementById('additional_rate_taxable_pay').textContent = '£ ~';

    document.getElementById('higher_rate_taxable_income').textContent = '£ ~';
    document.getElementById('higher_rate_taxable_pay').textContent = '£ ~';

    document.getElementById('taxable_income').textContent = '£ ~';
    document.getElementById('total_tax_payable').textContent = '£ ~';
    document.getElementById('post_tax_income').textContent = '£ ~';

    document.getElementById('ni_taxable_income').textContent = '£ ~';
    document.getElementById('ni_basic_rate_taxable_income').textContent = '£ ~';
    document.getElementById('ni_basic_rate_taxable_pay').textContent = '£ ~';
    document.getElementById('ni_higher_rate_taxable_income').textContent = '£ ~';
    document.getElementById('ni_higher_rate_taxable_pay').textContent = '£ ~';
    document.getElementById('total_ni').textContent = '£ ~';
    document.getElementById('monthly_ni').textContent = '£ ~';

    document.getElementById('income_less_threshold').textContent = '£ ~';
    document.getElementById('monthly_sf_payment').textContent = '£ ~';
    document.getElementById('annual_sf_payment').textContent = '£ ~';


    document.getElementById('net_take_home_figure').textContent = '£ ~';
    document.getElementById('net_monthly_take_home_figure').textContent = '£ ~';
    document.getElementById('annual_pension_figure').textContent = '£ ~';
    document.getElementById('monthly_pension_figure').textContent = '£ ~';
    document.getElementById('annual_sf_figure').textContent = '£ ~';
    document.getElementById('monthly_sf_figure').textContent = '£ ~';
    document.getElementById('annual_ni_figure').textContent = '£ ~';
    document.getElementById('monthly_ni_figure').textContent = '£ ~';
    document.getElementById('gross_annual_salary').textContent = '£ ~';
    document.getElementById('gross_monthly_salary').textContent = '£ ~';
    document.getElementById('gross_weekly_salary').textContent = '£ ~';
    document.getElementById('gross_daily_salary').textContent = '£ ~';
    document.getElementById('gross_hourly_salary').textContent = '£ ~';



    plan_1_threshold = PLAN_1_THRESHHOLD
    document.getElementById('plan_1_threshold').textContent = `£${PLAN_1_THRESHHOLD}`;
    plan_2_threshold = PLAN_2_THRESHHOLD
    document.getElementById('plan_2_threshold').textContent = `£${PLAN_2_THRESHHOLD}`;
    plan_4_threshold = PLAN_4_THRESHHOLD
    document.getElementById('plan_4_threshold').textContent = `£${PLAN_4_THRESHHOLD}`;
    plan_postgrad_threshold = PLAN_POSTGRAD_THRESHHOLD
    document.getElementById('plan_postgrad_threshold').textContent = `£${PLAN_POSTGRAD_THRESHHOLD}`;

    plan_1_threshold_month = PLAN_1_THRESHHOLD / 12
    document.getElementById('plan_1_threshold_month').textContent = `£${plan_1_threshold_month.toFixed(2)}`;
    plan_2_threshold_month = PLAN_2_THRESHHOLD / 12
    document.getElementById('plan_2_threshold_month').textContent = `£${plan_2_threshold_month.toFixed(2)}`;
    plan_4_threshold_month = PLAN_4_THRESHHOLD / 12
    document.getElementById('plan_4_threshold_month').textContent = `£${plan_4_threshold_month.toFixed(2)}`;
    plan_postgrad_threshold_month = PLAN_POSTGRAD_THRESHHOLD / 12
    document.getElementById('plan_postgrad_threshold_month').textContent = `£${plan_postgrad_threshold_month.toFixed(2)}`;


    return;
  }

  //---------------------------------------------------------------------------------------------------------------------

  //Pension Section
  //Annual Pension Contribution
  annual_pension = gross_salary * (pension_contribution_percentage / 100);
  document.getElementById('annual_pension_contribution').textContent = `£${annual_pension.toFixed(2)}`;


  //Monthly Pension Contribution
  monthly_pension = annual_pension / 12;
  document.getElementById('monthly_pension_contribution').textContent = `£${monthly_pension.toFixed(2)}`;

  //---------------------------------------------------------------------------------------------------------------------

  //Top Salary Section
  //Gross Income Minus Pension
  gross_income_minus_pension = gross_salary - annual_pension;
  document.getElementById('gross_income_minus_pension').textContent = `£${gross_income_minus_pension.toFixed(2)}`;


  //100k Tax band Personal Allowance rule
  personal_allowance_rule;
  if (gross_income_minus_pension > PERSONAL_ALLOWANCE_THRESHOLD) {
    personal_allowance_rule = gross_income_minus_pension - PERSONAL_ALLOWANCE_THRESHOLD;
  } else {
    personal_allowance_rule = 0;
  }
  document.getElementById('personal_allowance_rule').textContent = `£${personal_allowance_rule.toFixed(2)}`;


  //100k Personal Allowance Deduction
  personal_allowance_deduction;
  if (personal_allowance_rule / 2 > PERSONAL_ALLOWANCE_LIMIT) {
    personal_allowance_deduction = PERSONAL_ALLOWANCE_LIMIT;
  } else {
    personal_allowance_deduction = personal_allowance_rule / 2;
  }
  document.getElementById('personal_allowance_deduction').textContent = `£${personal_allowance_deduction.toFixed(2)}`;


  //Applicable Tax Rate
  if (gross_income_minus_pension <= PERSONAL_ALLOWANCE_LIMIT) {
    applicable_tax_rate = PERSONAL_ALLOWANCE_RATE_PERCENTAGE;
  } else if (gross_income_minus_pension <= BASIC_RATE_LIMIT) {
    applicable_tax_rate = BASIC_RATE_PERCENTAGE;
  } else if (gross_income_minus_pension <= HIGHER_RATE_LIMIT) {
    applicable_tax_rate = HIGHER_RATE_PERCENTAGE;
  } else {
    applicable_tax_rate = ADDITIONAL_RATE_PERCENTAGE;
  }
  document.getElementById('applicable_tax_rate').textContent = `${applicable_tax_rate}%`;


  //Personal Allowance
  if (gross_income_minus_pension > PERSONAL_ALLOWANCE_LIMIT) {
    personal_allowance = PERSONAL_ALLOWANCE_LIMIT - personal_allowance_deduction;
  } else {
    personal_allowance = gross_income_minus_pension;
  }
  document.getElementById('personal_allowance').textContent = `£${personal_allowance.toFixed(2)}`;


  //Taxable Income
  taxable_income = gross_income_minus_pension - personal_allowance;
  document.getElementById('taxable_income').textContent = `£${taxable_income.toFixed(2)}`;


  //Tax Rate Table
    //Basic Rate Taxable Income
  if (taxable_income > (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT)) {
    basic_rate_taxable_income = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    basic_rate_taxable_income = taxable_income;
  }
  document.getElementById('basic_rate_taxable_income').textContent = `£${basic_rate_taxable_income.toFixed(2)}`;

    //Basic Rate Taxable Pay
  basic_rate_taxable_pay = basic_rate_taxable_income * (BASIC_RATE_PERCENTAGE/100);
  document.getElementById('basic_rate_taxable_pay').textContent = `£${basic_rate_taxable_pay.toFixed(2)}`;


    //Additional Rate Taxable Income
  if (taxable_income - HIGHER_RATE_LIMIT < 0) {
    additional_rate_taxable_income = 0;
  } else {
    additional_rate_taxable_income = taxable_income - HIGHER_RATE_LIMIT;
  }
  document.getElementById('additional_rate_taxable_income').textContent = `£${additional_rate_taxable_income.toFixed(2)}`;
    //Additional Rate Taxable Pay
  additional_rate_taxable_pay = additional_rate_taxable_income * (ADDITIONAL_RATE_PERCENTAGE/100);
  document.getElementById('additional_rate_taxable_pay').textContent = `£${additional_rate_taxable_pay.toFixed(2)}`;


    //Higher Rate Taxable Income
  if (taxable_income - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT + additional_rate_taxable_income) > 0) {
    higher_rate_taxable_income = taxable_income - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT + additional_rate_taxable_income);
  } else {
    higher_rate_taxable_income = 0;
  }
  document.getElementById('higher_rate_taxable_income').textContent = `£${higher_rate_taxable_income.toFixed(2)}`;
    //Higher Rate Taxable Pay
  higher_rate_taxable_pay = higher_rate_taxable_income * (HIGHER_RATE_PERCENTAGE/100);
  document.getElementById('higher_rate_taxable_pay').textContent = `£${higher_rate_taxable_pay.toFixed(2)}`;

  //Total Tax Payable
  total_tax_payable = basic_rate_taxable_pay + higher_rate_taxable_pay + additional_rate_taxable_pay
  document.getElementById('total_tax_payable').textContent = `£${total_tax_payable.toFixed(2)}`;

  //Post Tax Income
  post_tax_income = gross_income_minus_pension - total_tax_payable
  document.getElementById('post_tax_income').textContent = `£${post_tax_income.toFixed(2)}`;

  //---------------------------------------------------------------------------------------------------------------------

  //National Insurance
  if ((gross_income_minus_pension - PERSONAL_ALLOWANCE_LIMIT) > 0) {
    ni_taxable_income = gross_income_minus_pension - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    ni_taxable_income = 0;
  }
  document.getElementById('ni_taxable_income').textContent = `£${ni_taxable_income.toFixed(2)}`;


  //NI Higher rate table
  if ((gross_income_minus_pension - BASIC_RATE_LIMIT) < 0) {
    ni_higher_rate_taxable_income = 0;
  } else {
    ni_higher_rate_taxable_income = gross_income_minus_pension - BASIC_RATE_LIMIT;
  }
  document.getElementById('ni_higher_rate_taxable_income').textContent = `£${ni_higher_rate_taxable_income.toFixed(2)}`;

  ni_higher_rate_taxable_pay = ni_higher_rate_taxable_income * (NI_HIGHER_RATE_PERCENTAGE / 100);
  document.getElementById('ni_higher_rate_taxable_pay').textContent = `£${ni_higher_rate_taxable_pay.toFixed(2)}`;


  //NI Basic rate table
  if (ni_taxable_income > (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT)) {
    ni_basic_rate_taxable_income = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    ni_basic_rate_taxable_income = ni_taxable_income;
  }
  document.getElementById('ni_basic_rate_taxable_income').textContent = `£${ni_basic_rate_taxable_income.toFixed(2)}`;

  ni_basic_rate_taxable_pay = ni_basic_rate_taxable_income * (NI_BASIC_RATE_PERCENTAGE / 100);
  document.getElementById('ni_basic_rate_taxable_pay').textContent = `£${ni_basic_rate_taxable_pay.toFixed(2)}`;


  //Total NI
  total_ni = ni_basic_rate_taxable_pay + ni_higher_rate_taxable_pay
  document.getElementById('total_ni').textContent = `£${total_ni.toFixed(2)}`;


  //Monthly NI
  monthly_ni = total_ni / 12
  document.getElementById('monthly_ni').textContent = `£${monthly_ni.toFixed(2)}`;

//---------------------------------------------------------------------------------------------------------------------

  //Student Finance
  plan_1_threshold_month = PLAN_1_THRESHHOLD / 12
  plan_2_threshold_month = PLAN_2_THRESHHOLD / 12
  plan_4_threshold_month = PLAN_4_THRESHHOLD / 12
  plan_postgrad_threshold_month = PLAN_POSTGRAD_THRESHHOLD / 12

  SFpaymentplanselection = document.getElementById('sf_dropdown').value;

  //Student Finance
  if (SFpaymentplanselection === "Plan 1" && gross_income_minus_pension >= PLAN_1_THRESHHOLD) {
    income_less_threshold = (gross_income_minus_pension / 12) - plan_1_threshold_month;
  }
  else if (SFpaymentplanselection === "Plan 2" && gross_income_minus_pension >= PLAN_2_THRESHHOLD) {
    income_less_threshold = (gross_income_minus_pension / 12) - plan_2_threshold_month;
  }
  else if (SFpaymentplanselection === "Plan 4" && gross_income_minus_pension >= PLAN_4_THRESHHOLD) {
    income_less_threshold = (gross_income_minus_pension / 12) - plan_4_threshold_month;
  }
  else if (SFpaymentplanselection === "Postgraduate" && gross_income_minus_pension >= PLAN_POSTGRAD_THRESHHOLD) {
    income_less_threshold = (gross_income_minus_pension / 12) - plan_postgrad_threshold_month;
  }
  else if (SFpaymentplanselection === "N/A") {
    income_less_threshold = 0;
  }
  else {
    income_less_threshold = 0;
  }

  document.getElementById('income_less_threshold').textContent =
    `£${income_less_threshold.toFixed(2)}`;


    //Monthly sf payment
  if (SFpaymentplanselection === "Postgraduate") {
    monthly_sf_payment = Math.floor(income_less_threshold * (POSTGRAD_TAX_RATE / 100))
  } else {
    monthly_sf_payment = Math.floor(income_less_threshold * (PLAN_124_TAX_RATE / 100))
  }
  document.getElementById('monthly_sf_payment').textContent =`£${monthly_sf_payment.toFixed(2)}`;

  //Annual sf payment
  annual_sf_payment = monthly_sf_payment * 12
  document.getElementById('annual_sf_payment').textContent =`£${annual_sf_payment.toFixed(2)}`;

  //---------------------------------------------------------------------------------------------------------------------

  //Net & Gross figures
  net_take_home_figure = post_tax_income - total_ni - annual_sf_payment;
  document.getElementById('net_take_home_figure').textContent =`£${net_take_home_figure.toFixed(2)}`;

  net_monthly_take_home_figure = net_take_home_figure / 12;
  document.getElementById('net_monthly_take_home_figure').textContent =`£${net_monthly_take_home_figure.toFixed(2)}`;

  document.getElementById('annual_pension_figure').textContent =`£${annual_pension.toFixed(2)}`;

  document.getElementById('monthly_pension_figure').textContent =`£${monthly_pension.toFixed(2)}`;

  document.getElementById('annual_sf_figure').textContent =`£${annual_sf_payment.toFixed(2)}`;

  document.getElementById('monthly_sf_figure').textContent =`£${monthly_sf_payment.toFixed(2)}`;

  document.getElementById('annual_ni_figure').textContent =`£${total_ni.toFixed(2)}`;

  document.getElementById('monthly_ni_figure').textContent =`£${monthly_ni.toFixed(2)}`;

  document.getElementById('gross_annual_salary').textContent = `£${Number(gross_salary).toFixed(2)}`;

  gross_monthly_salary = gross_salary / 12;
  document.getElementById('gross_monthly_salary').textContent = `£${gross_monthly_salary.toFixed(2)}`;

  gross_weekly_salary = gross_salary / 52;
  document.getElementById('gross_weekly_salary').textContent = `£${gross_weekly_salary.toFixed(2)}`;

  gross_daily_salary = gross_weekly_salary / 5;
  document.getElementById('gross_daily_salary').textContent = `£${gross_daily_salary.toFixed(2)}`;

  gross_hourly_salary = gross_weekly_salary / 40;
  document.getElementById('gross_hourly_salary').textContent = `£${gross_hourly_salary.toFixed(2)}`;

  }
  //Calling updateAllCalculations() when the page loads to initialize the display of £ and - where relevant
  updateAllCalculations();
