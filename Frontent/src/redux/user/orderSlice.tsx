import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderData } from '../../models/models';

interface OrderState {
  orderData: OrderData | null;
  success: boolean;
}

const INITIAL_STATE: OrderState = {
    orderData: null,
  success: false,
};

const orderSlice = createSlice({
  name: 'orderData',
  initialState: INITIAL_STATE,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderData>) => {
      state.orderData = action.payload;
      state.success = true;
    },
    clearOrder: (state) => {
      state.orderData = null;
      state.success = false;
    },
  },
});

export const { setOrderData, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
