//const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reEmailHTML5 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
  if (!emails) {
    return null;
  }
  // split string of emails on comma
  // map over the resultant array and trim
  // test if the email exists and against the above RegEx and return any email that DON'T match
  const invalidEmailsArr = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email && reEmailHTML5.test(email) === false);

  if (invalidEmailsArr.length) {
    return `These emails are invalid: ${invalidEmailsArr}`;
  }

  return null;
};
