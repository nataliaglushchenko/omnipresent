import { connect } from 'react-redux';

import EmployeeInformationForm from './employeeInformationForm';

import { countrySelector } from '../../boundedContexts/employeeInformation/ducks/country';

const mapStateToProps = state => {
    return {
        country: countrySelector(state)
    };
};

export default connect(mapStateToProps)(EmployeeInformationForm);
