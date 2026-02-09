//------------------------------------------------------------------------------
// Theme Toggle Functionality
//------------------------------------------------------------------------------

// Get the theme toggle button
themeToggle = document.getElementById('theme-toggle');
// Check for saved theme preference or default to dark mode
currentTheme = localStorage.getItem('theme') || 'dark';
// Apply the saved theme on page load
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  // Get current theme
  theme = document.documentElement.getAttribute('data-theme');
  // Switch theme
  newTheme = theme === 'dark' ? 'light' : 'dark';
  // Apply new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  // Save preference to localStorage
  localStorage.setItem('theme', newTheme);
});


//------------------------------------------------------------------------------
// Calculator Functionality
//------------------------------------------------------------------------------


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

const PLAN_1245_TAX_RATE = 9;
const POSTGRAD_TAX_RATE = 6;

const PLAN_1_THRESHOLD = 26900;
const PLAN_2_THRESHOLD = 29385;
const PLAN_4_THRESHOLD = 33795;
const PLAN_5_THRESHOLD = 25000;
const PLAN_POSTGRAD_THRESHOLD = 21000;

//Static Income tax % and Student finance thresholds
document.getElementById('basic_tax_rate').textContent = `${(BASIC_RATE_PERCENTAGE)}%`;
document.getElementById('higher_tax_rate').textContent = `${(HIGHER_RATE_PERCENTAGE)}%`;
document.getElementById('additional_tax_rate').textContent = `${(ADDITIONAL_RATE_PERCENTAGE)}%`;

document.getElementById('plan_1_threshold').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 0,maximumFractionDigits: 2}).format(PLAN_1_THRESHOLD)}`;
document.getElementById('plan_2_threshold').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 0,maximumFractionDigits: 2}).format(PLAN_2_THRESHOLD)}`;
document.getElementById('plan_4_threshold').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 0,maximumFractionDigits: 2}).format(PLAN_4_THRESHOLD)}`;
document.getElementById('plan_5_threshold').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 0,maximumFractionDigits: 2}).format(PLAN_5_THRESHOLD)}`;
document.getElementById('plan_postgrad_threshold').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 0,maximumFractionDigits: 2}).format(PLAN_POSTGRAD_THRESHOLD)}`;

document.getElementById('plan_1_threshold_month').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((PLAN_1_THRESHOLD / 12))}`;
document.getElementById('plan_2_threshold_month').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((PLAN_2_THRESHOLD / 12))}`;
document.getElementById('plan_4_threshold_month').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((PLAN_4_THRESHOLD / 12))}`;
document.getElementById('plan_5_threshold_month').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((PLAN_5_THRESHOLD / 12))}`;
document.getElementById('plan_postgrad_threshold_month').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((PLAN_POSTGRAD_THRESHOLD / 12))}`;

document.getElementById('plan_1_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
document.getElementById('plan_2_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
document.getElementById('plan_4_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
document.getElementById('plan_5_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
document.getElementById('postgrad_tax_rate').textContent = `${POSTGRAD_TAX_RATE}%`;

//------------------------------------------------------------------------------------

//Inputs - Gross salary, Pension contribution % or amount
document.getElementById('gross_salary_input').oninput = function(){
  gross_salary = parseFloat(document.getElementById('gross_salary_input').value);
  // Re-validate pension amount when gross salary changes
  updateAllCalculations();
}

//------------------------------------------------------------------------------------

// Pension percentage validation - prevent exceeding 100% or negative number
document.getElementById('pension_contribution_percent').addEventListener('input', function() {
  //Returns the value of the addEventListener as a float and assigns it as 'percentage'
  let pension_contribution_percent_value = parseFloat(this.value);
  // Prevent percentage from exceeding 100% or less than 0%
  if (pension_contribution_percent_value > 100) {
    this.value = 100;
  } else if (pension_contribution_percent_value < 0) {
    this.value = 0;
  }
});

//------------------------------------------------------------------------------------

// Pension amount validation - prevent exceeding gross salary and 0 if no salary input
// Validate pension when salary input changes
document.getElementById('gross_salary_input').oninput = function(){
  validatePensionAmount();
  updateAllCalculations();
}

// Validate pension when pension amount input changes
document.getElementById('pension_contribution_amount').addEventListener('input', function() {
  validatePensionAmount();
});

//------------------------------------------------------------------------------------

// Separate validation function that can be called from both inputs
function validatePensionAmount() {
  const pensionInput = document.getElementById('pension_contribution_amount');
  const pension_contribution_amount_value = parseFloat(pensionInput.value) || 0;
  const gross_salary = parseFloat(document.getElementById('gross_salary_input').value) || 0;

  let pension_notice_html = '';
  
  // Check if pension amount is negative
  if (pension_contribution_amount_value < 0) {
    pensionInput.value = '';
    pension_notice_html = `<span class="pension_notice">Pension contribution must be £0 or greater*</span>`;
  }
  // Check if pension exceeds gross salary (only if salary has been entered)
  else if (pension_contribution_amount_value > gross_salary) {
    pension_notice_html = `<span class="pension_notice">Pension contribution should not be greater than gross salary*</span>`;
  }
  
  // Update the notice element
  document.getElementById('pension_notice').innerHTML = pension_notice_html;
}

//------------------------------------------------------------------------------------

//Alternating validation to ensure only pension percentage or amount is entered
document.getElementById('pension_contribution_percent').oninput = function(){
  pension_contribution_percentage = document.getElementById('pension_contribution_percent').value;
  // Clear the amount field when percentage is entered
  if (pension_contribution_percentage) {
    document.getElementById('pension_contribution_amount').value = '';
    document.getElementById('pension_notice').innerHTML = '';
  }
  updateAllCalculations();
}

document.getElementById('pension_contribution_amount').oninput = function(){
  pension_amount = document.getElementById('pension_contribution_amount').value;
  // Clear the percentage field when amount is entered
  if (pension_amount) {
    document.getElementById('pension_contribution_percent').value = '';
  }
  updateAllCalculations();
}

//------------------------------------------------------------------------------------

function updateAllCalculations() {

  salaryInput = document.getElementById('gross_salary_input');
  pensionPercentInput = document.getElementById('pension_contribution_percent');
  pensionAmountInput = document.getElementById('pension_contribution_amount');

  gross_salary = salaryInput.value;
  pension_contribution_percentage = pensionPercentInput.value;
  pension_amount = pensionAmountInput.value;

  hasError = false;

//If gross_salary input is empty, hasError = True, therefore add .error classlist css. Else remove .error
  if (!gross_salary) {
    salaryInput.classList.add('error');
    hasError = true;
  } else {
    salaryInput.classList.remove('error');
  }

  // Check that at least ONE pension field has a value
  if (!pension_contribution_percentage && !pension_amount) {
    pensionPercentInput.classList.add('error');
    pensionAmountInput.classList.add('error');
    hasError = true;
  } else {
    pensionPercentInput.classList.remove('error');
    pensionAmountInput.classList.remove('error');
  }

  //Validation to show £ ~ if gross_salary or pension inputs are empty.
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

    document.getElementById('net_take_home_figure').textContent = '£ ~';
    document.getElementById('net_monthly_take_home_figure').textContent = '£ ~';
    document.getElementById('effective_tax_rate').textContent = '~';
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

    // Clear student finance breakdown
    document.getElementById('sf_breakdown').innerHTML = '<tr><td colspan="3" style="color:#D22B2B;"}>Enter salary and pension details*</td></tr>';
    document.getElementById('total_annual_sf').textContent = '£ ~';
    document.getElementById('total_monthly_sf').textContent = '£ ~';

    return;
  }

  //----------------------------------------------------------------------------
  //Pension Section
  //----------------------------------------------------------------------------

  //Calculate Annual Pension Contribution based on which input was used
  if (pension_contribution_percentage) {
    // User entered a percentage
    annual_pension = gross_salary * (pension_contribution_percentage / 100);
  } else {
    // User entered a fixed amount
    annual_pension = parseFloat(pension_amount);
  }
  
  document.getElementById('annual_pension_contribution').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(annual_pension)}`;

  //Monthly Pension Contribution
  monthly_pension = annual_pension / 12;
  document.getElementById('monthly_pension_contribution').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(monthly_pension)}`;


  //----------------------------------------------------------------------------
  //Income tax section
  //----------------------------------------------------------------------------

  //Gross Income Minus Pension
  gross_income_minus_pension = gross_salary - annual_pension;
  document.getElementById('gross_income_minus_pension').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(gross_income_minus_pension)}`;


  //100k Tax band Personal Allowance rule
  personal_allowance_rule;
  if (gross_income_minus_pension > PERSONAL_ALLOWANCE_THRESHOLD) {
    personal_allowance_rule = gross_income_minus_pension - PERSONAL_ALLOWANCE_THRESHOLD;
  } else {
    personal_allowance_rule = 0;
  }
  document.getElementById('personal_allowance_rule').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(personal_allowance_rule)}`;


  //100k Personal Allowance Deduction
  personal_allowance_deduction;
  if (personal_allowance_rule / 2 > PERSONAL_ALLOWANCE_LIMIT) {
    personal_allowance_deduction = PERSONAL_ALLOWANCE_LIMIT;
  } else {
    personal_allowance_deduction = personal_allowance_rule / 2;
  }
  document.getElementById('personal_allowance_deduction').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(personal_allowance_deduction)}`;


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
  document.getElementById('personal_allowance').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(personal_allowance)}`;


  //Taxable Income
  taxable_income = gross_income_minus_pension - personal_allowance;
  document.getElementById('taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(taxable_income)}`;


  //Tax Rate Table
    //Basic Rate Taxable Income
  if (taxable_income > (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT)) {
    basic_rate_taxable_income = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    basic_rate_taxable_income = taxable_income;
  }
  document.getElementById('basic_rate_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(basic_rate_taxable_income)}`;

    //Basic Rate Taxable Pay
  basic_rate_taxable_pay = basic_rate_taxable_income * (BASIC_RATE_PERCENTAGE/100);
  document.getElementById('basic_rate_taxable_pay').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(basic_rate_taxable_pay)}`;


    //Additional Rate Taxable Income
  if (taxable_income - HIGHER_RATE_LIMIT < 0) {
    additional_rate_taxable_income = 0;
  } else {
    additional_rate_taxable_income = taxable_income - HIGHER_RATE_LIMIT;
  }
  document.getElementById('additional_rate_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(additional_rate_taxable_income)}`;
    //Additional Rate Taxable Pay
  additional_rate_taxable_pay = additional_rate_taxable_income * (ADDITIONAL_RATE_PERCENTAGE/100);
  document.getElementById('additional_rate_taxable_pay').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(additional_rate_taxable_pay)}`;


    //Higher Rate Taxable Income
  if (taxable_income - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT + additional_rate_taxable_income) > 0) {
    higher_rate_taxable_income = taxable_income - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT + additional_rate_taxable_income);
  } else {
    higher_rate_taxable_income = 0;
  }
  document.getElementById('higher_rate_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(higher_rate_taxable_income)}`;
    //Higher Rate Taxable Pay
  higher_rate_taxable_pay = higher_rate_taxable_income * (HIGHER_RATE_PERCENTAGE/100);
  document.getElementById('higher_rate_taxable_pay').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(higher_rate_taxable_pay)}`;

  //Total Tax Payable
  total_tax_payable = basic_rate_taxable_pay + higher_rate_taxable_pay + additional_rate_taxable_pay
  document.getElementById('total_tax_payable').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_tax_payable)}`;

  //Post Tax Income
  post_tax_income = gross_income_minus_pension - total_tax_payable
  document.getElementById('post_tax_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(post_tax_income)}`;


  //----------------------------------------------------------------------------
  //National Insurance
  //----------------------------------------------------------------------------


  if ((gross_income_minus_pension - PERSONAL_ALLOWANCE_LIMIT) > 0) {
    ni_taxable_income = gross_income_minus_pension - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    ni_taxable_income = 0;
  }
  document.getElementById('ni_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(ni_taxable_income)}`;


  //NI Higher rate table
  if ((gross_income_minus_pension - BASIC_RATE_LIMIT) < 0) {
    ni_higher_rate_taxable_income = 0;
  } else {
    ni_higher_rate_taxable_income = gross_income_minus_pension - BASIC_RATE_LIMIT;
  }
  document.getElementById('ni_higher_rate_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(ni_higher_rate_taxable_income)}`;

  ni_higher_rate_taxable_pay = ni_higher_rate_taxable_income * (NI_HIGHER_RATE_PERCENTAGE / 100);
  document.getElementById('ni_higher_rate_taxable_pay').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(ni_higher_rate_taxable_pay)}`;


  //NI Basic rate table
  if (ni_taxable_income > (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT)) {
    ni_basic_rate_taxable_income = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE_LIMIT;
  } else {
    ni_basic_rate_taxable_income = ni_taxable_income;
  }
  document.getElementById('ni_basic_rate_taxable_income').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(ni_basic_rate_taxable_income)}`;

  ni_basic_rate_taxable_pay = ni_basic_rate_taxable_income * (NI_BASIC_RATE_PERCENTAGE / 100);
  document.getElementById('ni_basic_rate_taxable_pay').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(ni_basic_rate_taxable_pay)}`;


  //Total NI
  total_ni = ni_basic_rate_taxable_pay + ni_higher_rate_taxable_pay
  document.getElementById('total_ni').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_ni)}`;

  //Monthly NI
  monthly_ni = total_ni / 12
  document.getElementById('monthly_ni').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(monthly_ni)}`;


  //----------------------------------------------------------------------------
  // Student Finance - Concurrent Plans Support
  //----------------------------------------------------------------------------


  plan_1_checked = document.getElementById('plan_1').checked;
  plan_2_checked = document.getElementById('plan_2').checked;
  plan_4_checked = document.getElementById('plan_4').checked;
  plan_5_checked = document.getElementById('plan_5').checked;
  postgrad_checked = document.getElementById('postgraduate').checked;

  total_annual_sf = 0;
  total_monthly_sf = 0;

  // Calculate all plans first, store results
  plan_1_result = null;
  plan_2_result = null;
  plan_4_result = null;
  plan_5_result = null;
  postgrad_result = null;

  // PLAN 5 - Calculate FIRST before all other plans
  // Plan 5 gets income between £25k and the next highest threshold of other selected plans
  // PRIORITY: Plan 1 threshold > Plan 2 threshold > Plan 4 threshold
  if (plan_5_checked && gross_income_minus_pension >= PLAN_5_THRESHOLD) {
    plan_5_threshold_monthly = PLAN_5_THRESHOLD / 12;

    // Find the next threshold for Plan 5 (prioritize Plan 1, then Plan 2, then Plan 4)
    next_threshold = 0;

    if (plan_1_checked) {
      // Plan 1 selected: use Plan 1's threshold (highest priority)
      next_threshold = PLAN_1_THRESHOLD;
    } else if (plan_2_checked) {
      // Plan 1 not selected, but Plan 2 is: use Plan 2's threshold
      next_threshold = PLAN_2_THRESHOLD;
    } else if (plan_4_checked) {
      // Neither Plan 1 nor Plan 2 selected, but Plan 4 is: use Plan 4's threshold
      next_threshold = PLAN_4_THRESHOLD;
    }

    if (next_threshold > 0) {
      // Another plan is selected - Plan 5 goes up to that threshold
      plan_5_upper_threshold_monthly = next_threshold / 12;
    } else {
      // Plan 5 is alone - calculate on all income above its threshold
      plan_5_upper_threshold_monthly = gross_income_minus_pension / 12;
    }

    plan_5_income = Math.min(gross_income_minus_pension / 12, plan_5_upper_threshold_monthly) - plan_5_threshold_monthly;
    plan_5_monthly_payment = Math.floor(plan_5_income * (PLAN_1245_TAX_RATE / 100));
    plan_5_annual_payment = plan_5_monthly_payment * 12;

    if (plan_5_monthly_payment > 0) {
      total_monthly_sf += plan_5_monthly_payment;
      total_annual_sf += plan_5_annual_payment;
      plan_5_result = { monthly: plan_5_monthly_payment, annual: plan_5_annual_payment };
    }
  }

  // Special case: Plan 1 + Plan 4 together (income is split between them)
  if (plan_1_checked && plan_4_checked && !plan_2_checked && gross_income_minus_pension >= PLAN_1_THRESHOLD) {
    monthly_income = gross_income_minus_pension / 12;
    plan_1_threshold_monthly = PLAN_1_THRESHOLD / 12;
    plan_4_threshold_monthly = PLAN_4_THRESHOLD / 12;

    let plan_1_monthly_payment = 0;
    let plan_4_monthly_payment = 0;

    if (gross_income_minus_pension < PLAN_4_THRESHOLD) {
      // Below Plan 4 threshold: only Plan 1 repays
      plan_1_monthly_payment = Math.floor((monthly_income - plan_1_threshold_monthly) * (PLAN_1245_TAX_RATE / 100));
      plan_4_monthly_payment = 0;
    } else {
      // Above Plan 4 threshold: income split between plans
      // Plan 1 gets income between £26,065 and £32,745
      plan_1_income = plan_4_threshold_monthly - plan_1_threshold_monthly;
      plan_1_monthly_payment = Math.floor(plan_1_income * (PLAN_1245_TAX_RATE / 100));

      // Plan 4 gets income above £32,745
      plan_4_income = monthly_income - plan_4_threshold_monthly;
      plan_4_monthly_payment = Math.floor(plan_4_income * (PLAN_1245_TAX_RATE / 100));
    }

    plan_1_annual_payment = plan_1_monthly_payment * 12;
    plan_4_annual_payment = plan_4_monthly_payment * 12;

    total_monthly_sf += plan_1_monthly_payment + plan_4_monthly_payment;
    total_annual_sf += plan_1_annual_payment + plan_4_annual_payment;

    if (plan_1_monthly_payment > 0) {
      plan_1_result = { monthly: plan_1_monthly_payment, annual: plan_1_annual_payment };
    }

    if (plan_4_monthly_payment > 0) {
      plan_4_result = { monthly: plan_4_monthly_payment, annual: plan_4_annual_payment };
    }
  }

  // Special case: Plan 1 + Plan 2 together (income is split between them)
  if (plan_1_checked && plan_2_checked && gross_income_minus_pension >= PLAN_1_THRESHOLD) {
    monthly_income = gross_income_minus_pension / 12;
    plan_1_threshold_monthly = PLAN_1_THRESHOLD / 12;
    plan_2_threshold_monthly = PLAN_2_THRESHOLD / 12;

    plan_1_monthly_payment = 0;
    plan_2_monthly_payment = 0;

    if (gross_income_minus_pension < PLAN_2_THRESHOLD) {
      // Below Plan 2 threshold: only Plan 1 repays
      plan_1_monthly_payment = Math.floor((monthly_income - plan_1_threshold_monthly) * (PLAN_1245_TAX_RATE / 100));
      plan_2_monthly_payment = 0;
    } else {
      // Above Plan 2 threshold: income split between plans
      // Plan 1 gets income between £26,065 and £28,470
      plan_1_income = plan_2_threshold_monthly - plan_1_threshold_monthly;
      plan_1_monthly_payment = Math.floor(plan_1_income * (PLAN_1245_TAX_RATE / 100));

      // Plan 2 gets income above £28,470
      plan_2_income = monthly_income - plan_2_threshold_monthly;
      plan_2_monthly_payment = Math.floor(plan_2_income * (PLAN_1245_TAX_RATE / 100));
    }

    plan_1_annual_payment = plan_1_monthly_payment * 12;
    plan_2_annual_payment = plan_2_monthly_payment * 12;

    total_monthly_sf += plan_1_monthly_payment + plan_2_monthly_payment;
    total_annual_sf += plan_1_annual_payment + plan_2_annual_payment;

    if (plan_1_monthly_payment > 0) {
      plan_1_result = { monthly: plan_1_monthly_payment, annual: plan_1_annual_payment };
    }

    if (plan_2_monthly_payment > 0) {
      plan_2_result = { monthly: plan_2_monthly_payment, annual: plan_2_annual_payment };
    }
  }

  // Plan 1 calculation (only if NOT combined with Plan 2 or Plan 4)
  if (plan_1_checked && !plan_2_checked && !plan_4_checked && gross_income_minus_pension >= PLAN_1_THRESHOLD) {
    plan_1_monthly_threshold = PLAN_1_THRESHOLD / 12;
    plan_1_income_over = (gross_income_minus_pension / 12) - plan_1_monthly_threshold;
    plan_1_monthly_payment = Math.floor(plan_1_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_1_annual_payment = plan_1_monthly_payment * 12;

    total_monthly_sf += plan_1_monthly_payment;
    total_annual_sf += plan_1_annual_payment;

    plan_1_result = { monthly: plan_1_monthly_payment, annual: plan_1_annual_payment };
  }

  // Plan 2 calculation (only if NOT combined with Plan 1)
  if (plan_2_checked && !plan_1_checked && gross_income_minus_pension >= PLAN_2_THRESHOLD) {
    plan_2_monthly_threshold = PLAN_2_THRESHOLD / 12;
    plan_2_income_over = (gross_income_minus_pension / 12) - plan_2_monthly_threshold;
    plan_2_monthly_payment = Math.floor(plan_2_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_2_annual_payment = plan_2_monthly_payment * 12;

    total_monthly_sf += plan_2_monthly_payment;
    total_annual_sf += plan_2_annual_payment;

    plan_2_result = { monthly: plan_2_monthly_payment, annual: plan_2_annual_payment };
  }

  // Plan 4 calculation (only if NOT combined with Plan 1 or Plan 2)
  if (plan_4_checked && gross_income_minus_pension >= PLAN_4_THRESHOLD && !plan_1_checked && !plan_2_checked) {
    plan_4_monthly_threshold = PLAN_4_THRESHOLD / 12;
    plan_4_income_over = (gross_income_minus_pension / 12) - plan_4_monthly_threshold;
    plan_4_monthly_payment = Math.floor(plan_4_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_4_annual_payment = plan_4_monthly_payment * 12;

    total_monthly_sf += plan_4_monthly_payment;
    total_annual_sf += plan_4_annual_payment;

    plan_4_result = { monthly: plan_4_monthly_payment, annual: plan_4_annual_payment };
  }

  // Postgraduate calculation (always calculated independently)
  if (postgrad_checked && gross_income_minus_pension >= PLAN_POSTGRAD_THRESHOLD) {
    postgrad_monthly_threshold = PLAN_POSTGRAD_THRESHOLD / 12;
    postgrad_income_over = (gross_income_minus_pension / 12) - postgrad_monthly_threshold;
    // Use toFixed to avoid floating point precision issues, then floor
    postgrad_monthly_payment = Math.floor(Number((postgrad_income_over * (POSTGRAD_TAX_RATE / 100)).toFixed(10)));
    postgrad_annual_payment = postgrad_monthly_payment * 12;

    total_monthly_sf += postgrad_monthly_payment;
    total_annual_sf += postgrad_annual_payment;

    postgrad_result = { monthly: postgrad_monthly_payment, annual: postgrad_annual_payment };
  }

  // Build HTML in numerical order: Plan 1, 2, 4, 5, Postgrad
  sf_breakdown_html = '';

  if (plan_1_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 1</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_1_result.annual)}</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_1_result.monthly)}</td>
      </tr>
    `;
  }

  if (plan_2_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 2</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_2_result.annual)}</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_2_result.monthly)}</td>
      </tr>
    `;
  }

  if (plan_4_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 4</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_4_result.annual)}</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_4_result.monthly)}</td>
      </tr>
    `;
  }

  if (plan_5_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 5</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_5_result.annual)}</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(plan_5_result.monthly)}</td>
      </tr>
    `;
  }

  if (postgrad_result) {
    sf_breakdown_html += `
      <tr>
        <td>Postgraduate</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(postgrad_result.annual)}</td>
        <td>£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(postgrad_result.monthly)}</td>
      </tr>
    `;
  }

  // If no plans selected
  if (sf_breakdown_html === '') {
    sf_breakdown_html = '<tr><td colspan="3">No repayment due — plan not selected or below threshold</td></tr>';
  }

  // Update the DOM
  document.getElementById('sf_breakdown').innerHTML = sf_breakdown_html;
  document.getElementById('total_annual_sf').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_annual_sf)}`;
  document.getElementById('total_monthly_sf').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_monthly_sf)}`;


  //----------------------------------------------------------------------------
  //Net & Gross figures
  //----------------------------------------------------------------------------

  //Gross figures
  document.getElementById('gross_annual_salary').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(Number(gross_salary))}`;
  gross_monthly_salary = gross_salary / 12;
  document.getElementById('gross_monthly_salary').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(gross_monthly_salary)}`;
  gross_weekly_salary = gross_salary / 52;
  document.getElementById('gross_weekly_salary').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(gross_weekly_salary)}`;
  gross_daily_salary = gross_weekly_salary / 5;
  document.getElementById('gross_daily_salary').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(gross_daily_salary)}`;
  gross_hourly_salary = gross_weekly_salary / 40;
  document.getElementById('gross_hourly_salary').textContent = `£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(gross_hourly_salary)}`;

  //Net figures
  net_take_home_figure = post_tax_income - total_ni - total_annual_sf;
  document.getElementById('net_take_home_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(net_take_home_figure)}`;
  net_monthly_take_home_figure = net_take_home_figure / 12;
  document.getElementById('net_monthly_take_home_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(net_monthly_take_home_figure)}`;
  
  //Effective tax rate
  if (gross_income_minus_pension === 0) {
    effective_tax_rate = 0;
  } else {
    effective_tax_rate = ((total_tax_payable + total_annual_sf + total_ni) / gross_income_minus_pension) * 100;
  }
  document.getElementById('effective_tax_rate').textContent =`${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(effective_tax_rate)}%`;

  //Pension figures
  document.getElementById('annual_pension_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(annual_pension)}`;
  document.getElementById('monthly_pension_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(monthly_pension)}`;

  //Student finance figures
  document.getElementById('annual_sf_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_annual_sf)}`;
  document.getElementById('monthly_sf_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_monthly_sf)}`;

  // National insurance figures
  document.getElementById('annual_ni_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(total_ni)}`;
  document.getElementById('monthly_ni_figure').textContent =`£${Intl.NumberFormat('en-GB', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format(monthly_ni)}`;

}

//Calling updateAllCalculations() when the page loads to initialize the display of £ ~ where relevant
updateAllCalculations();