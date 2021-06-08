const commonFields = {
    firstName: {
        id: "firstName",
        name: "First name",
        type: "text"
    },
    lastName: {
        id: "lastName",
        name: "Last name",
        type: "text"
    },
    dateOfBirth: {
        id: "dateOfBirth",
        name: "Date of birth",
        type: "date"
    },
    holidayAllowance: {
        id: "holidayAllowance",
        name: "Holiday Allowance", 
        type: "number"
    },
};

export const config = {
    spain: {
        fields: {
            ...commonFields,
            holidayAllowance: {
                ...commonFields.holidayAllowance,
                settings: {
                    min: 30
                }
            },
            maritalStatus: {
                id: "maritalStatus",
                name: "Marital status", 
                type: "text", 
            },
            socialInsuranceNumber: {
                id: "socialInsuranceNumber",
                name: "Social insurance number",
                type: "text"
            }
        }
    },
    ghana: {
        fields: {
            ...commonFields,
            maritalStatus: {
                id: "maritalStatus",
                name: "Marital status", 
                type: "text", 
            },
            numberOfChildren: {
                id: "numberOfChildren",
                name: "Number of children",
                type: "number"
            }
        }
    },
    brazil: {
        fields: {
            ...commonFields,
            holidayAllowance: {
                ...commonFields.holidayAllowance,
                settings: {
                    max: 40
                }
            },
            workingHours: {
                id: "workingHours",
                name: "Working hours", 
                type: "text", 
            },   
        }
    }
} 
