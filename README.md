# Emaily App

This app was built as part of Stephen Grider's "Node with React: Fullstack Web Development" Course

[Project Site on Heroku](https://infinite-waters-06976.herokuapp.com/)

### Technologies/Methods Used:

**Server-side**

- Node
- Express
- MongoDB / Atlas Cloud
- Mongoose
- Lodash
- SendGrid for email distribution
- Stripe for payment processing
- Heroku for app deployment
- Passport and Google OAuth
- Nodemon for automatic server restarts on save
- Ngrok for forwarding webhook requests from SendGrid to localhost
- Concurrently for starting up both api and client servers with one command

**Client-side**

- React
- React Router
- Redux
- Redux Thunk
- Axios
- Materialize
- React Stripe
- http proxy middleware
- Functional Components with Hooks

### TODOs/Improvement Suggestions

**Frontend**: _Easy_ - Improve the design of the survey list and cards (bar chart? last responded?).
**Backend**: _Easy_ - Allow users to delete surveys that have been created
**Frontend+Backend**: _Medium_ - Allow users to specify the "from" field
**Backend**: _Medium_ - Update Mailer for latest Sendgrid API
**Frontend**: _Medium_ - Allow clientside sorting of surveys
**Frontend+Backend**: _Hard_ - Add the ability to create distribution lists and select them from a dropdown rather than a string of emails
**Frontend+Backend**: _Very Hard_ - Allow surveys to be created in "draft mode" (e.g., save the survey and come back to it to edit or send later)
