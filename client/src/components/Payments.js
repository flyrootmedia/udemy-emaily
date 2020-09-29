import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

// NOTE: Stripe Checkout "amount" prop expects US dollars in cents by default (so 500 below is $5.00)
// "token" prop is the auth token returned by Stripe (it's an object with all the payment deets)
// "stripeKey" prop is the publishable key
// If you don't add a child element it will use default styles/el
const Payments = ({ handleToken }) => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={token => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}>
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, { handleToken })(Payments);
