import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Button, Box, Typography, InputAdornment } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useNavigate } from 'react-router';
import { registration } from '../../services/AllServices';
import { GoogleLogin } from '@react-oauth/google';

export default function AuthRegister() {
  const [level, setLevel] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);
  const handleGoogleAuth = async (credential) => {
    try {
      const response = await googleAuth(credential);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard/default', { replace: true });
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 6 characters')
          .max(20, 'Password must be less than 20 characters')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          )
          .test('trim-check', 'Password cannot start or end with spaces', (val) => val === val?.trim()),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const payload = {
            name: `${values.firstname} ${values.lastname}`,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
          };

          const response = await registration(payload);
          const data = response.data;

          setStatus({ success: true });
          localStorage.setItem('token', data.token);
          navigate('/dashboard/default', { replace: true });
          console.log('Registered user:', data.user);
        } catch (err) {
          if (err.response) {
            const { status, data } = err.response;
            if (status === 422 && data.errors) {
              setErrors(data.errors);
            } else {
              setErrors({ submit: data.message || 'Registration failed' });
            }
          } else if (err.request) {
            setErrors({ submit: 'No response from server. Please check your connection.' });
          } else {
            setErrors({ submit: err.message });
          }
          setStatus({ success: false });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname"
                  name="firstname"
                  value={values.firstname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                  error={Boolean(touched.firstname && errors.firstname)}
                />
                {touched.firstname && errors.firstname && <FormHelperText error>{errors.firstname}</FormHelperText>}
              </Stack>
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                <OutlinedInput
                  id="lastname"
                  name="lastname"
                  value={values.lastname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Doe"
                  fullWidth
                  error={Boolean(touched.lastname && errors.lastname)}
                />
                {touched.lastname && errors.lastname && <FormHelperText error>{errors.lastname}</FormHelperText>}
              </Stack>
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Email Address*</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </Stack>
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">Password*</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </Stack>
              <Box mt={1} display="flex" alignItems="center">
                <Box bgcolor={level.color} width={85} height={8} borderRadius="7px" />
                <Typography ml={1} variant="subtitle2" fontSize="0.75rem">
                  {level.label}
                </Typography>
              </Box>
            </Grid>
            {/* Confirm Password */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password_confirmation">Confirm Password*</InputLabel>
                <OutlinedInput
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={values.password_confirmation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormHelperText error>{errors.password_confirmation}</FormHelperText>
                )}
              </Stack>
            </Grid>
            {/* Submit Error */}
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            {/* Create Account */}
            <Grid item xs={12}>
              <AnimateButton>
                <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
                  Create Account
                </Button>
              </AnimateButton>
              <Typography style={{ marginTop: '24px', textAlign: 'center', color: 'gray', fontSize: '13px' }}>Or</Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <AnimateButton>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleAuth(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  text="continue_with"
                  shape="rectangular"
                  size="large"
                  width="100%"
                  mt={5}
                />
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
