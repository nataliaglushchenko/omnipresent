import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as yup from "yup";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

import { config } from '../../boundedContexts/employeeInformation/models/employeeInfoFormConfig';

const propTypes = {
    country: PropTypes.string.isRequired
};

const defaultProps = {

};

const DEFAULT_HOLIDAY_ALLOWANCE = {
    MIN: 0,
    MAX: 60
};

const buildValidationSchema = (fieldsToValidate, settings) => {
    const { holidayAllowance } = settings;

    const holidayAllowanceMin = Boolean(holidayAllowance) && Boolean(holidayAllowance.min) ? 
        holidayAllowance.min : DEFAULT_HOLIDAY_ALLOWANCE.MIN;

    const holidayAllowanceMax = Boolean(holidayAllowance) && Boolean(holidayAllowance.max) ? 
        holidayAllowance.max : DEFAULT_HOLIDAY_ALLOWANCE.MAX;

    const availableFields = {
        firstName: yup.string()
            .required('Please enter first name'),
        lastName: yup.string()
            .required('Please enter last name'),
        dateOfBirth: yup.date()
            .nullable()
            .typeError('Please enter date of birth'),
        holidayAllowance: yup.number()
            .required('Please enter holiday allowance')
            .min(holidayAllowanceMin, `Minimum ${holidayAllowanceMin}`)
            .max(holidayAllowanceMax, `Maximum ${holidayAllowanceMax}`),
        maritalStatus: yup.string()
            .required('Please enter marital status'),
        socialInsuranceNumber: yup.string()
            .required('Please enter social insurance number'),
        numberOfChildren: yup.number()
            .required('Please enter number of children'),
        workingHours: yup.string()
            .required('Please enter working hours'),
    };

    const validators = Object.keys(availableFields)
        .filter(key => fieldsToValidate.includes(key))
        .reduce((obj, key) => {
            return { ...obj, [key]: availableFields[key] };
        }, {});

    return yup.object().shape(validators);
};

function EmployeeInformationForm(props) {
    const { country } = props;
    const { fields } = config[country];

    const schema = useMemo(() => {
        let fieldsToValidate = [];
    
        let settings = {};

        Object.values(fields).forEach(field => {
            const { id, settings: fieldSettings } = field;

            if (!fieldsToValidate.includes(id)) {
                fieldsToValidate.push(id);
            }

            settings = {
                ...settings,
                [id]: fieldSettings
            };
            
        });

        return buildValidationSchema(fieldsToValidate, settings);
    }, [fields]);

    const myResolver = async (values, context) => {
        const { schema } = context;
        
        try {
            return {
                values: await schema.validate(values, { abortEarly: false }),
                errors: {}
            };
        } catch(e) {
            return {
                values: {},
                errors: e.inner.reduce(
                    (allErrors, currentError) => ({
                        ...allErrors,
                        [currentError.path]: {
                            type: currentError.type ?? 'validation',
                            message: currentError.message
                        }
                    }),
                {})
            };
        }
    };
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        context: { schema },
        resolver: myResolver
    });

    const handleReset = () => {
        reset({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            holidayAllowance: 0,
            maritalStatus: '',
            socialInsuranceNumber: '',
            numberOfChildren: 0
        });
    };
    
    const onSubmit = data => {
        console.log(data);
    };

    useEffect(() => {
        handleReset();
    }, [country]);

    const formFileds = Object.values(fields).map(field => {
        return (
            <div
                key={field.id}
            >
                <FormGroup
                    className={cn(
                        'd-flex',
                        'flex-sm-row',
                        'flex-column',
                        'justify-content-sm-end',
                        'justify-content-start',
                        'align-items-baseline',
                        {
                            'mb-1': Boolean(errors[field.id])
                        }
                    )}
                >
                    <Label 
                        for={field.id}
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
                    >
                        {field.name}
                    </Label>
                    <Controller
                        name={field.id}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Input 
                                {...controllerField}
                                type={field.type}
                                className={cn(
                                    'ml-sm-1',
                                    'col-sm-9'
                                )}
                                autoComplete="off"
                                placeholder={field.name}
                                title={Boolean(errors[field.id]) ? errors[field.id].message : ''}
                                invalid={Boolean(errors[field.id])}
                            />
                        )}
                    />  
                </FormGroup>
                {
                    errors[field.id] && 
                    <div className={cn('d-flex')}>
                        <span className={cn('flex-grow-1')}></span>
                        <span className={cn('col-sm-9', 'col-12', 'text-danger', 'px-2', 'mb-1')}>
                            <small>
                                {errors[field.id].message}
                            </small>
                        </span>
                    </div>
                }
            </div>
        );
    })
    
    return (
        <Form
            className={cn(
                'd-flex',
                'flex-column',
                'm-0',
                'p-sm-2',
                'p-2',
            )}       
        >
            <div
                className={cn(
                    'd-flex',
                    'flex-column'
                )}
            >
                {formFileds}
                <div
                    className={cn(
                        'd-flex',
                        'justify-content-end',
                    )}
                >
                    <Button
                        className={cn(
                            'mx-1'
                        )}
                        color="secondary" 
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button 
                        className={cn(
                            'mx-1'
                        )}
                        color="primary" 
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </Form>
    );
}

EmployeeInformationForm.propTypes = propTypes;
EmployeeInformationForm.defaultProps = defaultProps;

export default EmployeeInformationForm;
