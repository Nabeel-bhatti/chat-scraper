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
          .test('trim-check', 'Password cannot start or end with spaces', (val) => val === val?.trim())
          .max(10, 'Password must be less than 10 characters'),
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

          const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include'
          });

          const data = await response.json();

          if (!response.ok) {
            if (response.status === 422 && data.errors) {
              setErrors(data.errors);
            } else {
              setErrors({ submit: data.message || 'Registration failed' });
            }
            setStatus({ success: false });
          } else {
            setStatus({ success: true });
            localStorage.setItem('token', data.token);
            navigate("/dashboard/default", { replace: true });
            console.log('Registered user:', data.user);
          }
        } catch (err) {
          setErrors({ submit: err.message });
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
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

// OLD WORKING CODE

// import { useEffect, useState } from 'react';
// import { Link as RouterLink, useSearchParams } from 'react-router-dom';

// // material-ui
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid2';
// import Link from '@mui/material/Link';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // third-party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project imports
// import IconButton from 'components/@extended/IconButton';
// import AnimateButton from 'components/@extended/AnimateButton';

// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// // assets
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// // ============================|| JWT - REGISTER ||============================ //

// export default function AuthRegister() {
//   const [level, setLevel] = useState();
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const changePassword = (value) => {
//     const temp = strengthIndicator(value);
//     setLevel(strengthColor(temp));
//   };

//   const [searchParams] = useSearchParams();
//   const auth = searchParams.get('auth'); // get auth and set route based on that

//   useEffect(() => {
//     changePassword('');
//   }, []);

//   return (
//     <>
//       <Formik
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             const payload = {
//               name: `${values.firstname} ${values.lastname}`,
//               email: values.email,
//               password: values.password,
//               password_confirmation: values.password
//             };
//             console.log('🚀 ~ payload:', payload);
//             await fetch('http://localhost:8000/sanctum/csrf-cookie', {
//               credentials: 'include' // <- required
//             });
//             const response = await fetch('http://localhost:8000/api/register', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(payload)
//             });

//             const data = await response.json();

//             if (!response.ok) {
//               // Laravel-style error response handling
//               if (data.errors) {
//                 setErrors(data.errors);
//               } else {
//                 setErrors({ submit: data.message || 'Registration failed' });
//               }
//               setStatus({ success: false });
//             } else {
//               setStatus({ success: true });
//               // handle success, maybe navigate or show success message
//               console.log('User registered:', data);
//             }
//           } catch (error) {
//             setErrors({ submit: error.message });
//             setStatus({ success: false });
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//         initialValues={{
//           firstname: '',
//           lastname: '',
//           email: '',
//           password: '',
//           password_confirmatiob: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           firstname: Yup.string().max(255).required('First Name is required'),
//           lastname: Yup.string().max(255).required('Last Name is required'),
//           email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//           password: Yup.string()
//             .required('Password is required')
//             .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
//             .max(10, 'Password must be less than 10 characters')
//         })}
//       >
//         {({ errors, handleBlur, handleChange, touched, values, handleSubmit }) => {
//           console.log("🚀 ~ onSubmit={ ~ errors:", errors)
//           return (
//             <form noValidate onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                   <Stack sx={{ gap: 1 }}>
//                     <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
//                     <OutlinedInput
//                       id="firstname-login"
//                       type="firstname"
//                       value={values.firstname}
//                       name="firstname"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="John"
//                       fullWidth
//                       error={Boolean(touched.firstname && errors.firstname)}
//                     />
//                   </Stack>
//                   {touched.firstname && errors.firstname && (
//                     <FormHelperText error id="helper-text-firstname-signup">
//                       {errors.firstname}
//                     </FormHelperText>
//                   )}
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                   <Stack sx={{ gap: 1 }}>
//                     <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.lastname && errors.lastname)}
//                       id="lastname-signup"
//                       type="lastname"
//                       value={values.lastname}
//                       name="lastname"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Doe"
//                       inputProps={{}}
//                     />
//                   </Stack>
//                   {touched.lastname && errors.lastname && (
//                     <FormHelperText error id="helper-text-lastname-signup">
//                       {errors.lastname}
//                     </FormHelperText>
//                   )}
//                 </Grid>
//                 <Grid size={12}>
//                   <Stack sx={{ gap: 1 }}>
//                     <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.email && errors.email)}
//                       id="email-login"
//                       type="email"
//                       value={values.email}
//                       name="email"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="demo@company.com"
//                       inputProps={{}}
//                     />
//                   </Stack>
//                   {touched.email && errors.email && (
//                     <FormHelperText error id="helper-text-email-signup">
//                       {errors.email}
//                     </FormHelperText>
//                   )}
//                 </Grid>
//                 <Grid size={12}>
//                   <Stack sx={{ gap: 1 }}>
//                     <InputLabel htmlFor="password-signup">Password</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.password && errors.password)}
//                       id="password-signup"
//                       type={showPassword ? 'text' : 'password'}
//                       value={values.password}
//                       name="password"
//                       onBlur={handleBlur}
//                       onChange={(e) => {
//                         handleChange(e);
//                         changePassword(e.target.value);
//                       }}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                             edge="end"
//                             color="secondary"
//                           >
//                             {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       placeholder="******"
//                       inputProps={{}}
//                     />
//                   </Stack>
//                   {touched.password && errors.password && (
//                     <FormHelperText error id="helper-text-password-signup">
//                       {errors.password}
//                     </FormHelperText>
//                   )}
//                   <FormControl fullWidth sx={{ mt: 2 }}>
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid>
//                         <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
//                       </Grid>
//                       <Grid>
//                         <Typography variant="subtitle1" fontSize="0.75rem">
//                           {level?.label}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </FormControl>
//                 </Grid>
//                 <Grid size={12}>
//                   <Stack sx={{ gap: 1 }}>
//                     <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.password_confirmation && errors.password_confirmation)}
//                       id="password_confirmation"
//                       value={values.password_confirmation}
//                       name="password_confirmation"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Confirm password"
//                       inputProps={{}}
//                     />
//                   </Stack>
//                   {touched.company && errors.company && (
//                     <FormHelperText error id="helper-text-company-signup">
//                       {errors.company}
//                     </FormHelperText>
//                   )}
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="body2">
//                     By Signing up, you agree to our &nbsp;
//                     <Link variant="subtitle2" component={RouterLink} to="#">
//                       Terms of Service
//                     </Link>
//                     &nbsp; and &nbsp;
//                     <Link variant="subtitle2" component={RouterLink} to="#">
//                       Privacy Policy
//                     </Link>
//                   </Typography>
//                 </Grid>
//                 {errors.submit && (
//                   <Grid size={12}>
//                     <FormHelperText error>{errors.submit}</FormHelperText>
//                   </Grid>
//                 )}
//                 <Grid size={12}>
//                   <AnimateButton>
//                     <Button fullWidth size="large" variant="contained" color="primary" type="submit">
//                       Create Account
//                     </Button>
//                   </AnimateButton>
//                 </Grid>
//               </Grid>
//             </form>
//           );
//         }}
//       </Formik>
//     </>
//   );
// }
