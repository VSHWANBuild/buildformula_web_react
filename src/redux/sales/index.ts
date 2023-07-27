import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import {
  CommonParams,
  CreateCustomerParams,
  IBookingFormParams,
  IInstallmentDetails,
  IInstallmentOptions,
  InstallmentParams,
  IOtherCharges,
  IOtherChargesParam,
  ISalesState,
  ITermsnConditions,
  IUnitInfo,
  IUnitParkingInfo,
  IVisitor,
  UnitInfoParams,
  IBanksList,
} from './salesInterface';

export const getVisitorsList = createAsyncThunk<IVisitor[], CommonParams>(
  'sales/getVisitorsList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getVisitorsList(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const addCustomer = createAsyncThunk(
  'sales/addCustomer',
  async (params: CreateCustomerParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addCustomer(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getUnitInfo = createAsyncThunk<IUnitInfo, UnitInfoParams>(
  'sales/unitInfo',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getUnitInfo(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getUnitParkingInfo = createAsyncThunk<IUnitParkingInfo, CommonParams>(
  'sales/unitParkingInfo',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getUnitParkingInfo(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const addBooking = createAsyncThunk(
  'sales/addBooking',
  async (params: IBookingFormParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addBooking(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getOtherChargesList = createAsyncThunk<IOtherCharges, IOtherChargesParam>(
  'sales/getOtherChargesList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getOtherCharges(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getTermsnConditions = createAsyncThunk<ITermsnConditions[], CommonParams>(
  'sales/getTerms&Conditions',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getTermsnContions(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getInstallmentOptions = createAsyncThunk<IInstallmentOptions, CommonParams>(
  'sales/getInstallmentOptions',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getInstallmentOptions(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getInstallmentDetails = createAsyncThunk<IInstallmentDetails, InstallmentParams>(
  'sales/getInstallmentDetails',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getInstallmentData(params);
      
export const getBankList = createAsyncThunk(
  'sales/getTerms&Conditions',
  async (params,thunkApi) => {
    try {
      const { data: res } = await visitorService.getBankList();
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

const initialState: ISalesState = {
  loading: false,
  visitorList: [],
  unitInfo: {} as IUnitInfo,
  unitParkingInfo: {} as IUnitParkingInfo,
  otherChargesList: {} as IOtherCharges,
  termsList: [],
  installmentsList: {} as IInstallmentOptions,
  IInstallmentInformation: {} as IInstallmentDetails,
  banksList: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // visitors list
    builder.addCase(getVisitorsList.rejected, handleReject);
    builder.addCase(getVisitorsList.pending, handleLoading);
    builder.addCase(getVisitorsList.fulfilled, (state, action) => {
      return {
        ...state,
        visitorList: action?.payload,
      };
    });
    // add visitor
    builder.addCase(addCustomer.rejected, handleReject);
    builder.addCase(addCustomer.pending, handleLoading);
    builder.addCase(addCustomer.fulfilled, state => {
      return {
        ...state,
      };
    });
    // Unit info
    builder.addCase(getUnitInfo.rejected, handleReject);
    builder.addCase(getUnitInfo.pending, handleLoading);
    builder.addCase(getUnitInfo.fulfilled, (state, action) => {
      return {
        ...state,
        unitInfo: action?.payload,
      };
    });
    // Unit Parking info
    builder.addCase(getUnitParkingInfo.rejected, handleReject);
    builder.addCase(getUnitParkingInfo.pending, handleLoading);
    builder.addCase(getUnitParkingInfo.fulfilled, (state, action) => {
      return {
        ...state,
        unitParkingInfo: action?.payload,
      };
    });
    // Booking Form
    builder.addCase(addBooking.rejected, handleReject);
    builder.addCase(addBooking.pending, handleLoading);
    builder.addCase(addBooking.fulfilled, state => {
      return {
        ...state,
      };
    });
    // get other charges
    builder.addCase(getOtherChargesList.rejected, handleReject);
    builder.addCase(getOtherChargesList.pending, handleLoading);
    builder.addCase(getOtherChargesList.fulfilled, (state, action) => {
      return {
        ...state,
        otherChargesList: action?.payload,
      };
    });
    // get terms and conditions
    builder.addCase(getTermsnConditions.rejected, handleReject);
    builder.addCase(getTermsnConditions.pending, handleLoading);
    builder.addCase(getTermsnConditions.fulfilled, (state, action) => {
      return {
        ...state,
        termsList: action?.payload,
      };
    });
    // get installments options
    builder.addCase(getInstallmentOptions.rejected, handleReject);
    builder.addCase(getInstallmentOptions.pending, handleLoading);
    builder.addCase(getInstallmentOptions.fulfilled, (state, action) => {
      return {
        ...state,
        installmentsList: action?.payload,
      };
    });
    // get installments details
    builder.addCase(getInstallmentDetails.rejected, handleReject);
    builder.addCase(getInstallmentDetails.pending, handleLoading);
    builder.addCase(getInstallmentDetails.fulfilled, (state, action) => {
      return {
        ...state,
        IInstallmentInformation: action?.payload,
    // get banks List
    builder.addCase(getBankList.rejected, handleReject);
    builder.addCase(getBankList.pending, handleLoading);
    builder.addCase(getBankList.fulfilled, (state, action) => {
      return {
        ...state,
        banksList: action?.payload,
      };
    });
  },
});

export default salesSlice.reducer;
