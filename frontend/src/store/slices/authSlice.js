import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/auth/login', credentials);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/auth/register', userData);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    localStorage.removeItem('user');
    return rejectWithValue('Session expired');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await API.post('/auth/logout');
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user, loading: false, error: null },
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(loadUser.fulfilled, (state, action) => { state.user = action.payload.user; })
      .addCase(loadUser.rejected, (state) => { state.user = null; })
      .addCase(logout.fulfilled, (state) => { state.user = null; });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
