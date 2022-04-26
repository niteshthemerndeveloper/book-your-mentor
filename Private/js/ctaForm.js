// JavaScript

/** =========== MINIMUM SERVICE AMOUNT ============ */
const MIN_SERVICE_AMOUNT = 250;

/** =========== COMPANY SERVICE COST ============ */
const serviceCost = {
  perWindow: 10,
  perFrenchDoor: 5,
  perConsDebrisRemoval: 15,
  perPanel: 15,
  forGutterCleaning: 150,
  forRoofCleaning: 200,
  forDrivewayCleaning: 150,
};

/** =========== FORM INPUT PARAMETERS ============ */
const formInputParams = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phone: '',
  windows: '',
  frenchDoors: '',
  constructionDebris: '',
  stories: '',
  sqft: '',
  panels: '',
  windowCleaning: '',
  solarCleaning: '',
  gutterCleaning: '',
  roofCleaning: '',
  drivewayCleaning: '',
  powerCleaning: '',
  totalCleaningServices: 0,
  totalAdditionalCost: 0,
};

/** =========== BILLING PARAMETERS VARIABLES ============ */
const billingParameters = {
  windowCleaningCost: 0,
  frenchDoorsCost: 0,
  constructionDebrisCost: 0,

  // Additional Services
  solarCleaningCost: 0,
  gutterCleaningCost: 0,
  roofCleaningCost: 0,
  drivewayCleaningCost: 0,
  totalAdditionalCost() {
    return (
      this.solarCleaningCost +
      this.gutterCleaningCost +
      this.roofCleaningCost +
      this.drivewayCleaningCost
    );
  },
  totalCleaningCost() {
    return (
      this.windowCleaningCost +
      this.frenchDoorsCost +
      this.constructionDebrisCost +
      this.totalAdditionalCost()
    );
  },
  extraServiceCost() {
    return this.totalCleaningCost() < MIN_SERVICE_AMOUNT
      ? MIN_SERVICE_AMOUNT - this.totalCleaningCost()
      : '';
  },
  // extraServiceCost() {
  //   if (this.totalCleaningCost() < MIN_SERVICE_AMOUNT) {
  //     return (
  //       MIN_SERVICE_AMOUNT -
  //       this.windowCleaningCost -
  //       this.frenchDoorsCost -
  //       this.constructionDebrisCost
  //     );
  //   } else {
  //     return (
  //       this.totalCleaningCost() -
  //       this.windowCleaningCost -
  //       this.frenchDoorsCost -
  //       this.constructionDebrisCost
  //     );
  //   }
  // },
};

/** =========== GET ELEMENTS FROM DOM/UI ============ */
const fieldsetContainerEl = document.getElementById('fieldsetContainer');
let formFieldsetsEl = document.querySelectorAll('#fieldsetContainer fieldset');
let serviceFieldset4El = document.getElementById('serviceFieldset4');

/** =========== DECLARE GLOBAL VARIABLES ============ */
let fieldsetActiveState = 0;
let isInputFieldChecked = true;
let isPowerFieldChecked = true;
let totalCleaningServices = 0;
let totalPowerServices = 0;
let serviceFieldset4Index = formFieldsetsEl.length - 2;

/** =========== FORM FILLING PROGRESS ============ */
function formFillProgress() {
  /** =========== GET ELEMENTS FROM DOM/UI ============ */
  const nextBtns = document.querySelectorAll('.next__btn');
  const backBtns = document.querySelectorAll('.back__btn');

  nextBtns.forEach((nextBtn, nextBtnIndex) => {
    nextBtnEvent(nextBtn, nextBtnIndex);
  });

  backBtns.forEach((backBtn, backBtnIndex) => {
    backBtnEvent(backBtn, backBtnIndex);
  });

  // PREVENT ENTER TEXT
  window.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
  // INITIAL CALL TO MAKE TEXT WHITE
  setStepProgressActive();
}

formFillProgress();

/** =========== NEXT BTN EVENT ============ */
function nextBtnEvent(nextBtn, nextBtnIndex) {
  nextBtn.addEventListener('click', () => {
    validateFormInputs(nextBtnIndex);
    setStepProgressActive();
  });
}

/** =========== BACK BTN EVENT ============ */
function backBtnEvent(backBtn, backBtnIndex) {
  backBtn.addEventListener('click', () => {
    fieldsetActiveState = backBtnIndex;
    setFieldsetActive();
    setStepProgressActive();
    console.log(formInputParams, backBtnIndex);
  });
}

/** =========== FORM HEADER STEP PROGRESS ============ */
function setStepProgressActive() {
  /** =========== GET ELEMENTS FROM DOM/UI ============ */
  // Change PROGRESS BACKGROUND COLOR
  const stepProgressEl = document.getElementById('stepProgress');
  // Change PROGRESS TEXT COLOR
  const stepColEl = document.querySelectorAll('.step__col');

  serviceFieldset4Index = formFieldsetsEl.length - 1;
  const isLastField =
    formFieldsetsEl[serviceFieldset4Index].classList.contains('active');

  if (fieldsetActiveState <= 1) {
    stepProgressEl.style.width = `33.33%`;
    stepColEl.forEach((stepEl, stepIndex) => {
      if (stepIndex < 1) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });
  } else if (!isLastField) {
    stepProgressEl.style.width = `66.66%`;
    stepColEl.forEach((stepEl, stepIndex) => {
      if (stepIndex < 2) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });
  } else if (isLastField) {
    stepProgressEl.style.width = `100%`;
    stepColEl.forEach((stepEl, stepIndex) => {
      if (stepIndex < 3) {
        stepEl.classList.add('active');
      }
    });
  }
}

// /** =========== VALIDATE FORM INPUT FIELDS ============ */
async function validateFormInputs(nextBtnIndex) {
  const personalFieldset = document.querySelectorAll('#personalFieldset input');
  const contactFieldset = document.querySelectorAll('#contactFieldset input');
  const serviceFieldset1 = document.querySelectorAll(
    '#serviceFieldset1 .additional__card'
  );
  const serviceFieldset2 = document.querySelectorAll('#serviceFieldset2 input');
  const serviceFieldset3 = document.querySelectorAll('#serviceFieldset3 input');
  const serviceFieldset4 = document.querySelectorAll('#serviceFieldset4 input');

  // CHECK PERSONAL FIELDS AND UPDATE Pricing Parameters
  if (fieldsetActiveState === 0) {
    // CHECK INPUT FIELDS AND UPDATE Pricing Parameters
    isInputFieldChecked = checkInputFields(personalFieldset);
    if (
      formInputParams.firstName !== '' &&
      formInputParams.lastName !== '' &&
      formInputParams.email !== '' &&
      isInputFieldChecked
    ) {
      // VALIDATE EMAIL ADDRESS
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.value.match(mailFormat)) {
        fieldsetActiveState = nextBtnIndex + 1;
        setFieldsetActive();
      } else {
        email.style.border = '1px solid red';
      }
    }
  }
  // CHECK CONTACT FIELDS AND UPDATE Pricing Parameters
  else if (fieldsetActiveState === 1) {
    isInputFieldChecked = checkInputFields(contactFieldset);
    if (
      formInputParams.address !== '' &&
      formInputParams.phone !== '' &&
      isInputFieldChecked
    ) {
      fieldsetActiveState = nextBtnIndex + 1;
      setFieldsetActive();

      // Send Data to the Server -> Hubspot API
      // postFormDataToServer();
    }
  }
  // CHECK SERVICE FIELDS AND UPDATE Pricing Parameters
  else if (fieldsetActiveState === 2) {
    keepServicesHighlighted(serviceFieldset1);
    isInputFieldChecked = checkWindowServicesFields(serviceFieldset1);
    if (formInputParams.windowCleaning !== '' && isInputFieldChecked) {
      fieldsetActiveState = nextBtnIndex + 1;
      setFieldsetActive();
    }
  }
  // CHECK SERVICE FIELDS AND UPDATE Pricing Parameters
  else if (fieldsetActiveState === 3) {
    isInputFieldChecked = checkInputFields(serviceFieldset2);
    if (
      formInputParams.windows !== '' &&
      formInputParams.frenchDoors !== '' &&
      formInputParams.constructionDebris !== '' &&
      isInputFieldChecked
    ) {
      fieldsetActiveState = nextBtnIndex + 1;
      setFieldsetActive();
      handleQuoteBtn();
    }
  } else if (fieldsetActiveState === 4) {
    // Check Additional Services
    checkToggleAdditionalServices();
    formFieldsetsEl = document.querySelectorAll('#fieldsetContainer fieldset');
    isInputFieldChecked = checkInputFields(serviceFieldset3);
    if (formFieldsetsEl[formFieldsetsEl.length - 2].id === 'serviceFieldset4') {
      if (formInputParams.stories !== '' && isInputFieldChecked) {
        fieldsetActiveState = nextBtnIndex + 1;
        setFieldsetActive();
        totalAmountDisplayUI();
        checkToggleAdditionalServices();
      }
    } else {
      if (formInputParams.stories !== '' && isInputFieldChecked) {
        fieldsetActiveState = nextBtnIndex + 1;
        setFieldsetActive();
        totalAmountDisplayUI();
      }
    }
  } else if (fieldsetActiveState === 5) {
    isInputFieldChecked = checkInputFields(serviceFieldset4);
    isPowerFieldChecked = checkPowerServicesFields();
    if (formInputParams.panels !== '') {
      checkPowerServiceToProceed(
        isInputFieldChecked,
        isPowerFieldChecked,
        nextBtnIndex
      );
    } else if (isPowerFieldChecked && formInputParams.solarCleaning === '') {
      fieldsetActiveState = nextBtnIndex + 1;
      setFieldsetActive();
      totalAmountDisplayUI();
    }
  }
}

function checkPowerServiceToProceed(
  isInputFieldChecked,
  isPowerFieldChecked,
  nextBtnIndex
) {
  if (isInputFieldChecked && isPowerFieldChecked) {
    fieldsetActiveState = nextBtnIndex + 1;
    setFieldsetActive();
    totalAmountDisplayUI();
  } else if (isInputFieldChecked && formInputParams.powerCleaning === '') {
    fieldsetActiveState = nextBtnIndex + 1;
    setFieldsetActive();
    totalAmountDisplayUI();
  }
}

/** =========== CHECK INPUT FIELDS ============ */
function checkInputFields(fieldset) {
  isInputFieldChecked = true;
  fieldset.forEach((field) => {
    const fieldId = field.getAttribute('id');
    if (fieldsetActiveState >= 4) {
      field.style.border = '1px solid #667fa980';
    }
    if (
      (field.value === '' && field.hasAttribute('required')) ||
      field.value === '0'
    ) {
      field.style.border = '1px solid red';
      formInputParams.panels = '';
      isInputFieldChecked = false;
    } else if (field.value !== '' && field.value !== '0') {
      field.style.border = '1px solid #667fa980';
      formInputParams[fieldId] = field.value;
      // Billing Table
    }
  });

  return isInputFieldChecked;
}

/** =========== CHECK SERVICES (WINDOW) FIELDS ============ */
function checkWindowServicesFields(field) {
  isInputFieldChecked = false;
  if (field[1].classList.contains('selected') && totalCleaningServices >= 1) {
    field[1].classList.remove('error');
    isInputFieldChecked = true;
  } else if (!field[1].classList.contains('selected')) {
    field[1].classList.add('error');
    isInputFieldChecked = false;
  }
  return isInputFieldChecked;
}

function checkPowerServicesFields() {
  if (formInputParams.powerCleaning === '') {
    return true;
  }
  isPowerFieldChecked = false;
  const powerFieldsEl = document.querySelectorAll('.power__card');

  if (
    powerFieldsEl[0].classList.contains('selected') ||
    powerFieldsEl[1].classList.contains('selected')
  ) {
    powerFieldsEl.forEach((element) => element.classList.remove('error'));

    isPowerFieldChecked = true;
  } else if (
    !powerFieldsEl[0].classList.contains('selected') &&
    !powerFieldsEl[1].classList.contains('selected')
  ) {
    powerFieldsEl.forEach((element) => {
      if (fieldsetActiveState === 4) {
        element.classList.add('selected');
      } else {
        element.classList.add('error');
      }
    });
    isPowerFieldChecked = false;
  }

  return isPowerFieldChecked;
}

/** =========== SET FIELD SET AS ACTIVE ============ */
function setFieldsetActive() {
  formFieldsetsEl.forEach((element) => element.classList.remove('active'));

  formFieldsetsEl[fieldsetActiveState].classList.add('active');

  // ADD EVENT LISTENER TO THE LAST BACK BUTTON
  if (formFieldsetsEl[fieldsetActiveState].id === 'totalAmountFieldset') {
    keepPowerServicesHighlighted();
    const lastBackBtn = document.querySelectorAll('.back__btn');
    backBtnEvent(lastBackBtn[lastBackBtn.length - 1], lastBackBtn.length - 1);
  }
}

// /** =========== ADDITIONAL SERVICE SELECTION ============ */
function additionalServices() {
  const additionalCardsEl = document.querySelectorAll('.additional__card');

  additionalCardsEl.forEach((additionalCard) => {
    // GET ADDITIONAL SERVICE ID
    const additionalFieldId = additionalCard.childNodes[3].getAttribute('id');

    // HIGHLIGHT ADDITIONAL SERVICE
    additionalCard.addEventListener('click', (e) => {
      additionalCardsEl[1].classList.remove('error');
      totalCleaningServices = highlightCardItem(
        additionalFieldId,
        additionalCard
      );
    });
  });

  return formInputParams.totalCleaningServices;
}

additionalServices();

// /** =========== HIGHLIGHT ADDITIONAL SERVICES SELECTION ============ */
function highlightCardItem(cardFieldId, cardItemEl) {
  cardItemEl.classList.toggle('selected');

  if (cardItemEl.classList.contains('selected')) {
    formInputParams[cardFieldId] = cardFieldId;
    formInputParams.totalCleaningServices = ++totalCleaningServices;
  } else if (!cardItemEl.classList.contains('selected')) {
    formInputParams[cardFieldId] = '';
    formInputParams.totalCleaningServices = --totalCleaningServices;
  }

  if (cardFieldId === 'powerCleaning') {
    return totalCleaningServices;
  } else if (cardFieldId === 'roofCleaning') {
    return totalPowerServices;
  }
  return totalCleaningServices;
}

/** =========== KEEP SERVICES HIGHLIGHTED SELECTION ============ */
function keepServicesHighlighted(serviceFieldset1) {
  const { solarCleaning, powerCleaning, gutterCleaning, windowCleaning } =
    formInputParams;
  if (solarCleaning !== '') {
    serviceFieldset1[0].classList.add('selected');
  }
  if (windowCleaning !== '') {
    serviceFieldset1[1].classList.add('selected');
  }
  if (gutterCleaning !== '') {
    serviceFieldset1[2].classList.add('selected');
  }
  if (powerCleaning !== '') {
    serviceFieldset1[3].classList.add('selected');
  }
}

/** =========== KEEP SERVICES HIGHLIGHTED SELECTION ============ */
function keepPowerServicesHighlighted() {
  const powerCardsEl = document.querySelectorAll('.power__card');
  const { powerCleaning, drivewayCleaning, roofCleaning } = formInputParams;
  if (roofCleaning !== '' && powerCleaning !== '') {
    console.log(powerCardsEl);
    powerCardsEl[0].classList.add('selected');
  }
  if (drivewayCleaning !== '' && powerCleaning !== '') {
    console.log(powerCardsEl[1]);
    powerCardsEl[1].classList.add('selected');
  }
}

function checkToggleAdditionalServices() {
  const totalAmountFieldsetEl = document.getElementById('totalAmountFieldset');
  const solarPanelsEl = document.querySelector('.solar__panels');
  const powerCleaningTypesEl = document.querySelector('.power__cleaning');

  if (
    formInputParams.powerCleaning === '' &&
    formInputParams.solarCleaning === '' &&
    serviceFieldset4El.id === 'serviceFieldset4'
  ) {
    if (formFieldsetsEl.length <= 6) {
      return;
    }
    serviceFieldset4El = formFieldsetsEl[formFieldsetsEl.length - 2];

    // Remove Show Class
    checkNullAndToggleShow(solarPanelsEl, false);
    checkNullAndToggleShow(powerCleaningTypesEl, false);
    formFieldsetsEl[formFieldsetsEl.length - 2].remove();
  }

  if (
    formInputParams.powerCleaning !== '' ||
    formInputParams.solarCleaning !== ''
  ) {
    fieldsetContainerEl.insertBefore(serviceFieldset4El, totalAmountFieldsetEl);
  }

  // ALWAYS ADD CLASS IF NOT EMPTY
  checkNullAndToggleShow(solarPanelsEl, true);
  checkNullAndToggleShow(powerCleaningTypesEl, true);

  if (formInputParams.solarCleaning === '') {
    checkNullAndToggleShow(solarPanelsEl, false);
  }
  if (formInputParams.powerCleaning === '') {
    checkNullAndToggleShow(powerCleaningTypesEl, false);
  }
}

function checkNullAndToggleShow(element, isAddClass) {
  if (element === null) {
    return;
  }

  isAddClass ? element.classList.add('show') : element.classList.remove('show');
}

function additionalServiceTypes() {
  const powerCardsEl = document.querySelectorAll('.power__card');

  powerCardsEl.forEach((powerCard, index) => {
    // GET ADDITIONAL POWER SERVICE ID
    const powerFieldId = powerCard.childNodes[1].getAttribute('id');

    // HIGHLIGHT ADDITIONAL SERVICE
    powerCard.addEventListener('click', (e) => {
      powerCard.classList.remove('error');
      totalPowerServices = highlightCardItem(powerFieldId, powerCard);
    });
  });

  return formInputParams.totalCleaningServices;
}
additionalServiceTypes();

/** =========== HANDLE QUOTE BUTTON ============ */
function handleQuoteBtn() {
  const additionalBtn = document.querySelector('.additional__btn');

  if (totalCleaningServices <= 1) {
    additionalBtn.innerText = 'Get Quote';
    return;
  }

  if (totalCleaningServices === 2 && formInputParams.gutterCleaning !== '') {
    additionalBtn.innerText = 'Get Quote';
    return;
  }
  additionalBtn.innerText = 'Next';
}

/** =========== SERVICE BILLING INVOICE ============ */
function generateBillingCost() {
  const {
    perWindow,
    perFrenchDoor,
    perConsDebrisRemoval,
    perPanel,
    forGutterCleaning,
    forRoofCleaning,
    forDrivewayCleaning,
  } = serviceCost;

  billingParameters.windowCleaningCost = +formInputParams.windows * perWindow;
  billingParameters.frenchDoorsCost =
    +formInputParams.frenchDoors * perFrenchDoor;
  billingParameters.constructionDebrisCost =
    +formInputParams.constructionDebris * perConsDebrisRemoval;
  // Additional Services
  if (formInputParams.gutterCleaning === 'gutterCleaning') {
    billingParameters.gutterCleaningCost = forGutterCleaning;
  }
  if (formInputParams.solarCleaning === 'solarCleaning') {
    billingParameters.solarCleaningCost = +formInputParams.panels * perPanel;
  }
  if (formInputParams.roofCleaning === 'roofCleaning') {
    billingParameters.roofCleaningCost = forRoofCleaning;
  }
  if (formInputParams.drivewayCleaning === 'drivewayCleaning') {
    billingParameters.drivewayCleaningCost = forDrivewayCleaning;
  }

  // Update Billing Parameters Services
  updateBillingParameters();

  const totalBillingCost = billingParameters.totalCleaningCost();
  return totalBillingCost;
}

function totalAmountDisplayUI() {
  let totalPayment = generateBillingCost();
  totalAmountPageHtml(totalPayment);

  setFieldsetActive();
  paymentBtnEvent();

  // Clear Console
  console.clear();
}

function totalAmountPageHtml(totalPayment) {
  const paymentMessage = createPaymentMessage(totalPayment);
  totalPayment =
    totalPayment < MIN_SERVICE_AMOUNT ? MIN_SERVICE_AMOUNT : totalPayment;
  const totalAmountFieldset = document.getElementById('totalAmountFieldset');
  totalAmountFieldset.innerHTML = '';
  const totalAmountChildEl = document.createElement('div');
  totalAmountChildEl.innerHTML = `
  <h2 class="section__title text__align-center">Total Amount</h2>
            <div class="total__content">
              <p class="total__text">Windows Cleaning Cost</p>
              <span class="total__text">${
                '$' + billingParameters.windowCleaningCost
              }</span>
              <p class="total__text">French Doors Cleaning Cost</p>
              <span class="total__text">${
                '$' + billingParameters.frenchDoorsCost
              }</span>
              <p class="total__text">Construction Debris Cost</p>
              <span class="total__text">${
                '$' + billingParameters.constructionDebrisCost
              }</span>
              <p class="total__text">Additional Services Cost</p>
              <span class="total__text">${
                '$' + billingParameters.totalAdditionalCost()
              }</span>
            </div>
            <div class="total__content total__card">
              <p class="total__text">Total Cleaning Cost</p>
              <span class="total__text total__amount" id="totalPayment">${
                '$' + totalPayment
              }</span>
              <p class="total__text payment__message">${paymentMessage}</p>
            </div>
            <div class="btn__box">
              <button type="button" class="back__btn">Back</button>
              <button type="submit" class="payment__btn" id="paymentBtn">Proceed To Pay</button>
            </div>
  `;

  totalAmountFieldset.appendChild(totalAmountChildEl);
}

function createPaymentMessage(totalPayment) {
  return totalPayment < MIN_SERVICE_AMOUNT
    ? `Not Enough Windows, Extra ${
        '$' + (MIN_SERVICE_AMOUNT - totalPayment)
      } Service Charge`
    : '';
}

function updateBillingParameters() {
  if (formInputParams.gutterCleaning === '') {
    billingParameters.gutterCleaningCost = 0;
  }
  if (formInputParams.roofCleaning === '') {
    billingParameters.roofCleaningCost = 0;
  }
  if (formInputParams.solarCleaning === '') {
    billingParameters.solarCleaningCost = 0;
  }
  if (formInputParams.drivewayCleaning === '') {
    billingParameters.drivewayCleaningCost = 0;
  }
}

function paymentBtnEvent() {
  const paymentBtn = document.getElementById('paymentBtn');

  paymentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Proceed To Checkout');
    sendDataToMongoDB().then((data) => data);
    proceedToStripeCheckoutSession().then(
      (stripePaymentUrl) => stripePaymentUrl
    );
  });
}

function checkMinimumAndGetTotalCost() {
  const totalPayment = generateBillingCost();
  return totalPayment < MIN_SERVICE_AMOUNT ? MIN_SERVICE_AMOUNT : totalPayment;
}

// FETCH API & POST Request AND SUBMIT THE FORM DATA
const personalBtnEl = document.getElementById('personal__btn');
const contactBtnEl = document.getElementById('contact__btn');

personalBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (fieldsetActiveState < 1) {
    return;
  }
  postPersonalDataToServer().then((data) => data);
});

contactBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (fieldsetActiveState < 2) {
    return;
  }
  postContactDataToServer().then((data) => data);
});

// Make an HTTP POST Request AND SUBMIT THE FORM DATA
const postPersonalDataToServer = async () => {
  const url = `/api/hubspotcrm/create-user`;

  const { firstName, lastName, email } = formInputParams;
  const data = { firstName, lastName, email };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!resData.msg) {
      const msgError = await resData;
      Promise.reject(msgError);
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

// Make an HTTP POST Request AND SUBMIT THE FORM DATA
const postContactDataToServer = async () => {
  const url = `/api/hubspotcrm/update-user`;

  const { firstName, lastName, email, address, phone } = formInputParams;
  const data = { firstName, lastName, email, address, phone };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!resData.msg) {
      const msgError = await resData;
      Promise.reject(msgError);
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

// Send Form Data to Save User Details in MongoDB
const sendDataToMongoDB = async () => {
  console.log(billingParameters.extraServiceCost());
  const url = '/api/mongodb/save-user';

  const data = formInputParams;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!resData.msg) {
      const dataError = await resData;
      Promise.reject(dataError);
    }
    return resData;
  } catch (error) {
    console.error(error);
  }
};

// Post Form Data & Prompt a Stripe Checkout Session
const proceedToStripeCheckoutSession = async () => {
  const url = '/api/stripe/proceed-to-checkout';

  const paymentAmount = checkMinimumAndGetTotalCost();

  formInputParams.totalAdditionalCost = billingParameters.extraServiceCost();
  console.log(formInputParams.totalAdditionalCost);

  const data = {
    paymentAmount,
    formInputParams,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!resData.url) {
      const dataError = await resData;
      Promise.reject(dataError);
    }
    if (resData.url) {
      window.location = resData.url;
    }
    return resData;
  } catch (error) {
    console.error(error);
  }
};
