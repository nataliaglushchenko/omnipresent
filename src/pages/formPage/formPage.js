import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FormGroup, Label, Input } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

import EmployeeInformationForm from '../../components/employeeInformationForm';

import { AVAILABLE_COUNTRIES } from '../../boundedContexts/employeeInformation/models/countries';

const propTypes = {
    onChangeCountry: PropTypes.func.isRequired
};

const defaultProps = {
};

function FormPage(props) {
    const { onChangeCountry } = props;

    const [isEmployeeInfoFormShown, setIsEmployeeInfoFormShown] = useState(false);

    const { control } = useForm();

    const handleChangeCountry = (event) => {
        const value = event.target.value;

        if (value) {
            onChangeCountry({ country: value });

            setIsEmployeeInfoFormShown(true);
        } else {
            setIsEmployeeInfoFormShown(false);
        }
    };

    const countryOptions = Object.values(AVAILABLE_COUNTRIES).map(c => {
        return (
            <option
                key={c.id}
                value={c.id}
            >
                {c.name}
            </option>
        );
    });

    const countryForm = (
        <div
            className={cn(
                'my-4',
                'm-0',
                'p-sm-2',
                'p-2',
            )}
        >
            <FormGroup
                className={cn(
                    'd-flex',
                    'flex-sm-row',
                    'flex-column',
                    'justify-content-sm-end',
                    'justify-content-start',
                    'align-items-baseline',
                )}
            >
                <Label
                    className={cn(
                        'd-flex',
                        'mr-sm-1',
                        'p-0',
                        'ml-0',
                        'mt-0',
                        'mb-sm-0',
                        'mb-1',
                        'align-self-center',
                        'justify-content-sm-end',
                        'col-sm-3',
                    )}
                    for="country"
                >
                    Country of work
                </Label>
                <Controller
                    name="country"
                    control={control}
                    render={({ field, field: { onChange } }) => (
                        <Input
                            {...field} 
                            className={cn(
                                'ml-sm-1',
                                'col-sm-9'
                            )}
                            type="select"
                            placeholder="Country of work"
                            autoComplete="on"
                            onChange={(e) => {
                                onChange(e);
                                handleChangeCountry(e);
                            }}
                        >
                            <option value="">Select a country</option>
                            {countryOptions}
                        </Input>
                    )}
                />
            </FormGroup>
        </div> 
    );

    return (
        <>
            <div
                className={cn(
                    'mt-4',
                    'm-2',
                    'p-2',
                    'text-center'
                )}
                style={{ fontSize: "1.25rem" }}
            >
                EMPLOYEE INFORMATION FORM
            </div>
            <div
                className={cn(
                    'd-flex',
                    'flex-row',
                    'justify-content-center'
                )}
            >
                <div 
                    className={cn(
                        'col-lg-7', 
                        'col-md-9', 
                        'col-sm-11', 
                        'col-12'
                    )}
                >
                    {countryForm}
                    {
                        isEmployeeInfoFormShown &&
                        <EmployeeInformationForm />
                    }
                </div>
            </div>
        </>
    );
}

FormPage.propTypes = propTypes;
FormPage.defaultProps = defaultProps;

export default FormPage;
