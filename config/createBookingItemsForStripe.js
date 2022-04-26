// Booking Price in Cents for Stripe Checkout Session
// const bookingPriceInCents = {
//   priceInCents: 100,
// };

// For Testing if the Items getting Generated right

// const formInputsParams = {
//   constructionDebris: 2,
//   drivewayCleaning: 0,
//   frenchDoors: 2,
//   gutterCleaning: 'gutterCleaning',
//   panels: 'p',
//   roofCleaning: 0,
//   windows: '0',
// };

// bookingId from stripeCheckoutSession route
const createBookingItemsForStripe = (bookingId) => {
  const priceInCents = 100;

  const bookingItems = [
    { id: 11, name: 'Productivity1 Coach', price: 49 * priceInCents },
    { id: 12, name: 'Productivity2 Coach', price: 33 * priceInCents },
    { id: 13, name: 'Productivity3 Coach', price: 33 * priceInCents },
    { id: 14, name: 'Productivity4 Coach', price: 33 * priceInCents },
    { id: 15, name: 'Productivity5 Coach', price: 49 * priceInCents },
    { id: 16, name: 'Productivity6 Coach', price: 56 * priceInCents },
    { id: 21, name: 'Fitness1 Coach', price: 33 * priceInCents },
    { id: 22, name: 'Fitness2 Coach', price: 24 * priceInCents },
    { id: 23, name: 'Fitness3 Coach', price: 33 * priceInCents },
    { id: 24, name: 'Fitness4 Coach', price: 24 * priceInCents },
    { id: 25, name: 'Fitness5 Coach', price: 33 * priceInCents },
    { id: 26, name: 'Fitness6 Coach', price: 49 * priceInCents },
    { id: 31, name: 'Finance1 Coach', price: 12 * priceInCents },
    { id: 32, name: 'Finance2 Coach', price: 29 * priceInCents },
    { id: 33, name: 'Finance3 Coach', price: 12 * priceInCents },
    { id: 34, name: 'Finance4 Coach', price: 18 * priceInCents },
    { id: 35, name: 'Finance5 Coach', price: 12 * priceInCents },
    { id: 36, name: 'Finance6 Coach', price: 18 * priceInCents },
  ];

  // Check the User Item id with the Available booking Items
  const bookingItem = bookingItems.filter((item) => {
    return item.id === bookingId;
  });

  return bookingItem[0];
};

module.exports = createBookingItemsForStripe;
