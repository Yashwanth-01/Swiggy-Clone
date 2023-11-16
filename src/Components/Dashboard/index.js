import {useLocation, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

function Dashboard() {
    const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/')
    }
    return (
        <>
        <h1>Greetings, {location.state.name}! Your dashboard is ready for exploration. </h1>
        <Button variant="contained" onClick={handleSubmit}>LogOut</Button>
        </>
    )
}

export default Dashboard;