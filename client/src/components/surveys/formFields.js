export default [
  {
    name: 'title',
    placeholder: 'Enter a name for your survey',
    labelText: 'Survey Title',
    messages: {
      required: 'You must provide a title for your survey'
    }
  },
  {
    name: 'subject',
    placeholder: "Enter your survey's email subject",
    labelText: 'Email Subject',
    messages: {
      required: 'You must provide an email subject for your survey'
    }
  },
  {
    name: 'body',
    placeholder: 'Enter the content of your survey',
    labelText: 'Email Body',
    messages: {
      required: 'You must provide the email content for your survey'
    }
  },
  {
    name: 'recipients',
    placeholder: 'Enter email addresses, separated by commas',
    labelText: 'Recipient List',
    messages: {
      required: 'You must provide a list of recipients',
      valid: 'Recipients must be valid email addresses, separated by commas.'
    }
  }
];
