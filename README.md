## Frontend

To run the application use the command *npm start*.

### Description

For this task I used *react-hook-form* for creating forms and *yup* for validation. 

I integrated reactstrap and bootstrap for design purposes. 

Redux is used for collecting the information about selected country and applying it to render the apropriate information fields. 

As long as the required information fields differ from one county to anoter and we need the correct validation in the form, the dynamic fields validation was developed. 

The yup validation schema contains the full list of fields available for proposed countries for the sake of simplicity. This could be improved by inroducing the dynamic schema bulding (different schemas for each country based on config provided).
Because of some specific internal caching of validation schema in the basic *useForm* hook config, I created and used my custom resolver and context property to pass the different validation schemas to the *useForm* hook to adjust the validation for different countries fields. This custom validation resolver function (which I used in my code) has been taken from the oficial documentation.

I didn't focus on tests in this task.
