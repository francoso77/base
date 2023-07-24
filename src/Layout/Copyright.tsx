import { Link, Typography } from '@mui/material';

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{fontSize:15}}>
        {'Copyright © '}
        <Link color="inherit" href="https://sitedaempresa.com.br/">
          Site da Empresa
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }