// Theme Toggle Functionality
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

const PLAN_1_THRESHHOLD = 26065;
const PLAN_2_THRESHHOLD = 28470;
const PLAN_4_THRESHHOLD = 32745;
const PLAN_5_THRESHHOLD = 25000;
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

  salaryInput = document.getElementById('gross_salary_input');
  pensionInput = document.getElementById('pension_contribution_input');

  gross_salary = salaryInput.value;
  pension_contribution_percentage = pensionInput.value;

  // Reset errors
  salaryInput.classList.remove('error');
  pensionInput.classList.remove('error');

  hasError = false;

  if (!gross_salary) {
    salaryInput.classList.add('error');
    hasError = true;
  }

  if (!pension_contribution_percentage) {
    pensionInput.classList.add('error');
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

    document.getElementById('plan_1_threshold').textContent = `£${PLAN_1_THRESHHOLD}`;
    document.getElementById('plan_2_threshold').textContent = `£${PLAN_2_THRESHHOLD}`;
    document.getElementById('plan_4_threshold').textContent = `£${PLAN_4_THRESHHOLD}`;
    document.getElementById('plan_5_threshold').textContent = `£${PLAN_5_THRESHHOLD}`;
    document.getElementById('plan_postgrad_threshold').textContent = `£${PLAN_POSTGRAD_THRESHHOLD}`;

    document.getElementById('plan_1_threshold_month').textContent = `£${(PLAN_1_THRESHHOLD / 12).toFixed(2)}`;
    document.getElementById('plan_2_threshold_month').textContent = `£${(PLAN_2_THRESHHOLD / 12).toFixed(2)}`;
    document.getElementById('plan_4_threshold_month').textContent = `£${(PLAN_4_THRESHHOLD / 12).toFixed(2)}`;
    document.getElementById('plan_5_threshold_month').textContent = `£${(PLAN_5_THRESHHOLD / 12).toFixed(2)}`;
    document.getElementById('plan_postgrad_threshold_month').textContent = `£${(PLAN_POSTGRAD_THRESHHOLD / 12).toFixed(2)}`;

    document.getElementById('plan_1_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
    document.getElementById('plan_2_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
    document.getElementById('plan_4_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
    document.getElementById('plan_5_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
    document.getElementById('postgrad_tax_rate').textContent = `${POSTGRAD_TAX_RATE}%`;

    // Clear student finance breakdown
    document.getElementById('sf_breakdown').innerHTML = '<tr><td colspan="3" style="color:#D22B2B;"}>Enter salary and pension details*</td></tr>';
    document.getElementById('total_annual_sf').textContent = '£ ~';
    document.getElementById('total_monthly_sf').textContent = '£ ~';

    return;
  }


  //----------------------------------------------------------------------------


  //Pension Section
  //Annual Pension Contribution
  annual_pension = gross_salary * (pension_contribution_percentage / 100);
  document.getElementById('annual_pension_contribution').textContent = `£${annual_pension.toFixed(2)}`;

  //Monthly Pension Contribution
  monthly_pension = annual_pension / 12;
  document.getElementById('monthly_pension_contribution').textContent = `£${monthly_pension.toFixed(2)}`;


  //----------------------------------------------------------------------------


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


  //----------------------------------------------------------------------------


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


  //----------------------------------------------------------------------------


  // Student Finance - Concurrent Plans Support
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
  if (plan_5_checked && gross_income_minus_pension >= PLAN_5_THRESHHOLD) {
    plan_5_threshold_monthly = PLAN_5_THRESHHOLD / 12;

    // Find the highest threshold among other selected plans
    next_threshold = 0;
    if (plan_1_checked) next_threshold = Math.max(next_threshold, PLAN_1_THRESHHOLD);
    if (plan_2_checked) next_threshold = Math.max(next_threshold, PLAN_2_THRESHHOLD);
    if (plan_4_checked) next_threshold = Math.max(next_threshold, PLAN_4_THRESHHOLD);

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
  if (plan_1_checked && plan_4_checked && !plan_2_checked && gross_income_minus_pension >= PLAN_1_THRESHHOLD) {
    monthly_income = gross_income_minus_pension / 12;
    plan_1_threshold_monthly = PLAN_1_THRESHHOLD / 12;
    plan_4_threshold_monthly = PLAN_4_THRESHHOLD / 12;

    let plan_1_monthly_payment = 0;
    let plan_4_monthly_payment = 0;

    if (gross_income_minus_pension < PLAN_4_THRESHHOLD) {
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
  if (plan_1_checked && plan_2_checked && gross_income_minus_pension >= PLAN_1_THRESHHOLD) {
    monthly_income = gross_income_minus_pension / 12;
    plan_1_threshold_monthly = PLAN_1_THRESHHOLD / 12;
    plan_2_threshold_monthly = PLAN_2_THRESHHOLD / 12;

    plan_1_monthly_payment = 0;
    plan_2_monthly_payment = 0;

    if (gross_income_minus_pension < PLAN_2_THRESHHOLD) {
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
  if (plan_1_checked && !plan_2_checked && !plan_4_checked && gross_income_minus_pension >= PLAN_1_THRESHHOLD) {
    plan_1_monthly_threshold = PLAN_1_THRESHHOLD / 12;
    plan_1_income_over = (gross_income_minus_pension / 12) - plan_1_monthly_threshold;
    plan_1_monthly_payment = Math.floor(plan_1_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_1_annual_payment = plan_1_monthly_payment * 12;

    total_monthly_sf += plan_1_monthly_payment;
    total_annual_sf += plan_1_annual_payment;

    plan_1_result = { monthly: plan_1_monthly_payment, annual: plan_1_annual_payment };
  }

  // Plan 2 calculation (only if NOT combined with Plan 1)
  if (plan_2_checked && !plan_1_checked && gross_income_minus_pension >= PLAN_2_THRESHHOLD) {
    plan_2_monthly_threshold = PLAN_2_THRESHHOLD / 12;
    plan_2_income_over = (gross_income_minus_pension / 12) - plan_2_monthly_threshold;
    plan_2_monthly_payment = Math.floor(plan_2_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_2_annual_payment = plan_2_monthly_payment * 12;

    total_monthly_sf += plan_2_monthly_payment;
    total_annual_sf += plan_2_annual_payment;

    plan_2_result = { monthly: plan_2_monthly_payment, annual: plan_2_annual_payment };
  }

  // Plan 4 calculation (only if NOT combined with Plan 1 or Plan 2)
  if (plan_4_checked && gross_income_minus_pension >= PLAN_4_THRESHHOLD && !plan_1_checked && !plan_2_checked) {
    plan_4_monthly_threshold = PLAN_4_THRESHHOLD / 12;
    plan_4_income_over = (gross_income_minus_pension / 12) - plan_4_monthly_threshold;
    plan_4_monthly_payment = Math.floor(plan_4_income_over * (PLAN_1245_TAX_RATE / 100));
    plan_4_annual_payment = plan_4_monthly_payment * 12;

    total_monthly_sf += plan_4_monthly_payment;
    total_annual_sf += plan_4_annual_payment;

    plan_4_result = { monthly: plan_4_monthly_payment, annual: plan_4_annual_payment };
  }

  // Postgraduate calculation (always calculated independently)
  if (postgrad_checked && gross_income_minus_pension >= PLAN_POSTGRAD_THRESHHOLD) {
    postgrad_monthly_threshold = PLAN_POSTGRAD_THRESHHOLD / 12;
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
        <td>£${plan_1_result.annual.toFixed(2)}</td>
        <td>£${plan_1_result.monthly.toFixed(2)}</td>
      </tr>
    `;
  }

  if (plan_2_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 2</td>
        <td>£${plan_2_result.annual.toFixed(2)}</td>
        <td>£${plan_2_result.monthly.toFixed(2)}</td>
      </tr>
    `;
  }

  if (plan_4_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 4</td>
        <td>£${plan_4_result.annual.toFixed(2)}</td>
        <td>£${plan_4_result.monthly.toFixed(2)}</td>
      </tr>
    `;
  }

  if (plan_5_result) {
    sf_breakdown_html += `
      <tr>
        <td>Plan 5</td>
        <td>£${plan_5_result.annual.toFixed(2)}</td>
        <td>£${plan_5_result.monthly.toFixed(2)}</td>
      </tr>
    `;
  }

  if (postgrad_result) {
    sf_breakdown_html += `
      <tr>
        <td>Postgraduate</td>
        <td>£${postgrad_result.annual.toFixed(2)}</td>
        <td>£${postgrad_result.monthly.toFixed(2)}</td>
      </tr>
    `;
  }

  // If no plans selected
  if (sf_breakdown_html === '') {
    sf_breakdown_html = '<tr><td colspan="3">No repayment due — plan not selected or below threshold</td></tr>';
  }

  // Update the DOM
  document.getElementById('sf_breakdown').innerHTML = sf_breakdown_html;
  document.getElementById('total_annual_sf').textContent = `£${total_annual_sf.toFixed(2)}`;
  document.getElementById('total_monthly_sf').textContent = `£${total_monthly_sf.toFixed(2)}`;

  // Set these for use in other calculations
  annual_sf_payment = total_annual_sf;
  monthly_sf_payment = total_monthly_sf;

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

  // Update student finance thresholds table
  document.getElementById('plan_1_threshold').textContent = `£${PLAN_1_THRESHHOLD}`;
  document.getElementById('plan_2_threshold').textContent = `£${PLAN_2_THRESHHOLD}`;
  document.getElementById('plan_4_threshold').textContent = `£${PLAN_4_THRESHHOLD}`;
  document.getElementById('plan_5_threshold').textContent = `£${PLAN_5_THRESHHOLD}`;
  document.getElementById('plan_postgrad_threshold').textContent = `£${PLAN_POSTGRAD_THRESHHOLD}`;

  document.getElementById('plan_1_threshold_month').textContent = `£${(PLAN_1_THRESHHOLD / 12).toFixed(2)}`;
  document.getElementById('plan_2_threshold_month').textContent = `£${(PLAN_2_THRESHHOLD / 12).toFixed(2)}`;
  document.getElementById('plan_4_threshold_month').textContent = `£${(PLAN_4_THRESHHOLD / 12).toFixed(2)}`;
  document.getElementById('plan_5_threshold_month').textContent = `£${(PLAN_5_THRESHHOLD / 12).toFixed(2)}`;
  document.getElementById('plan_postgrad_threshold_month').textContent = `£${(PLAN_POSTGRAD_THRESHHOLD / 12).toFixed(2)}`;

  document.getElementById('plan_1_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
  document.getElementById('plan_2_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
  document.getElementById('plan_4_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
  document.getElementById('plan_5_tax_rate').textContent = `${PLAN_1245_TAX_RATE}%`;
  document.getElementById('postgrad_tax_rate').textContent = `${POSTGRAD_TAX_RATE}%`;

}

//Calling updateAllCalculations() when the page loads to initialize the display of £ and - where relevant
updateAllCalculations();
