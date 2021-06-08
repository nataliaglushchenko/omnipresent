// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const COUNTRY_CHANGED = 'COUNTRY_CHANGED';

const initialState = {
    country: ''
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case COUNTRY_CHANGED:
            return {
                ...state,
                country: action.payload.country,
            };

        default:
            return state;
    }
}

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------


export const countryChanged = ({ country }) => {
    return {
        type: COUNTRY_CHANGED,
        payload: { country }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.employeeInformation.country;

export const countrySelector = state => rootSelector(state).country;
