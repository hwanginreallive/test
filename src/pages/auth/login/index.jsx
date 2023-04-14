import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dataUser from '../../../assets/fake-data/dataUser.json';
import { setUser } from '../../../store/actions/index';
import authContext from '../../../store/authContext';
export default function Login() {
    const [, dispatch] = useContext(authContext);
    const [error, setError] = useState(false);
    const router = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        const isMatch = dataUser.find((item) => item.userName === username && item.password === password);
        if (isMatch) {
            dispatch(
                setUser({
                    access_token: username,
                    role: isMatch?.role,
                }),
            );

            localStorage.setItem('access_token', username);
            localStorage.setItem('role', isMatch?.role);

            toast.success('Đăng nhập thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            router('/dashboard');
        } else {
            setError(true);
            toast.error('Có lỗi khi đăng nhập', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="mt-[150px] w-[420px] mx-auto">
            <Typography className="text-center" component="h1" variant="h5">
                Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Tài khoản"
                    name="username"
                    error={error}
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    error={error}
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Ghi nhớ" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Đăng nhập
                </Button>
            </Box>
        </div>
    );
}
