import { connect } from 'react-redux';

import FormPage from './formPage';

import { countryChanged } from '../../boundedContexts/employeeInformation/ducks/country';


const mapDispatchToProps = {
    onChangeCountry: countryChanged
};

export default connect(null, mapDispatchToProps)(FormPage);
