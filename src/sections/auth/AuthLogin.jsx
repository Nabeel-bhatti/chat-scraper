import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { GoogleLogin } from '@react-oauth/google';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { login } from '../../services/AllServices';

export default function AuthLogin() {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleGoogleAuth = async (credential) => {
    try {
      const response = await googleAuth(credential);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard/default', { replace: true });
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  const handleLogin = async (values, { setSubmitting, setErrors, setStatus }) => {
    try {
      const response = await login(values);
      console.log('Login response:', response.data.token);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log('Login successful!');
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422 && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ submit: data.message || 'Login failed' });
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

  };
  return (
    <>
      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().max(255).required(),
          password: Yup.string().required(),
          // password: Yup.string()
          //   .required('Password is required')
          //   .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
          //   .max(10, 'Password must be less than 10 characters')
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                  </Stack>
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid sx={{ mt: -1 }} size={12}>
                  <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="h6">Keep me sign in</Typography>}
                    />
                    <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                      Forgot Password?
                    </Link>
                  </Stack>
                </Grid>
                {/* Submit Error */}
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error sx={{ fontWeight: '400', fontSize: '14px' }}>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid size={12}>
                  <AnimateButton>
                    <Button fullWidth size="large" type='submit' variant="contained" color="primary">
                      Login
                    </Button>
                  </AnimateButton>
                  <Typography style={{ marginTop: '20px', textAlign: 'center', color: 'gray', fontSize: '13px' }}>Or</Typography>
                </Grid>

                <Grid size={12} mb={2}>
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
          )
        }}
      </Formik>
    </>
  );
}
AuthLogin;
