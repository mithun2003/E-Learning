import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../Admin/utils/cssStyles';
// components
import Iconify from '../../Admin/iconify';
//


const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;


Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            ml:1,
            mt:2,
            color: 'text.primary',
            display: { lg: 'none' },
            backgroundColor:'transparent',
            alignItems:'flex-start',
            // '&:hover':{
            //     backgroundColor:'white'
            // }
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
  );
}
