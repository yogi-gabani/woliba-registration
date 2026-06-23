import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyId: null,
  companyName: '',
  email: '',
  fname: '',
  lname: '',
  otpToken: '',
  password: '',
  birthday: '',
  phoneNumber: '',
  workAnniversary: '',
  acceptedTerms: false,
  selectedInterests: [],
  selectedPillars: [],
  registeredUser: null,
  authToken: null,
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setCompanyData: (state, action) => {
      state.companyId = action.payload.companyId;
      state.companyName = action.payload.companyName;
      state.error = null;
    },
    setUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.fname = action.payload.fname;
      state.lname = action.payload.lname;
      state.error = null;
    },
    setOtpToken: (state, action) => {
      state.otpToken = action.payload;
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.password = action.payload.password;
      state.birthday = action.payload.birthday;
      state.phoneNumber = action.payload.phoneNumber;
      state.workAnniversary = action.payload.workAnniversary || '';
      state.acceptedTerms = action.payload.acceptedTerms;
      state.error = null;
    },
    setSelectedInterests: (state, action) => {
      state.selectedInterests = action.payload;
      state.error = null;
    },
    setSelectedPillars: (state, action) => {
      state.selectedPillars = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setRegistrationSuccess: (state, action) => {
      state.registeredUser = action.payload.user;
      state.authToken = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    resetRegistration: () => initialState,
    loadPreviewState: () => ({
      companyId: 12,
      companyName: 'Woliba',
      email: 'shivanishendkar@company.com',
      fname: 'Shivani',
      lname: 'Shendkar',
      otpToken: 'preview-mock-token',
      password: 'Shivani@Woliba',
      birthday: new Date(2007, 0, 6).toISOString(),
      phoneNumber: '9876543210',
      workAnniversary: '',
      acceptedTerms: true,
      selectedInterests: [1, 3, 7],
      selectedPillars: [],
      registeredUser: {
        fname: 'Shivani',
        lname: 'Shendkar',
        email: 'shivanishendkar@company.com',
      },
      authToken: 'preview-auth-token',
      loading: false,
      error: null,
    }),
  },
});

export const {
  setCompanyData,
  setUserDetails,
  setOtpToken,
  setCredentials,
  setSelectedInterests,
  setSelectedPillars,
  setLoading,
  setError,
  setRegistrationSuccess,
  resetRegistration,
  loadPreviewState,
} = registrationSlice.actions;

export default registrationSlice.reducer;
