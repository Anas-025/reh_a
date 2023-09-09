import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
    message: string;
    loading: boolean;
}

function GPBackdrop(props: Props) {
    const { loading, message } = props

    
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
            open={loading}
            className="flex flex-col gap-2"
        >
            <span>{message}</span>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default GPBackdrop
