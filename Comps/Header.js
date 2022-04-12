import React , {useState , useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useCounter } from "../Context/Context";
import Avatar from '@mui/material/Avatar';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import { Badge } from 'antd';
import firebase  from "../db/firebase";
import { Popconfirm, message } from 'antd';



import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { Router } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));




function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}





function Header() {
  const { query  } = useRouter();
  const router = useRouter();

  const{Userdata, setUserdata , isuser, setisuser ,  isMenu, setisMenu } =useCounter()
const [title, settitle] = useState(`Hello ,  ${Userdata.displayName} (${Userdata.email}) `)



     function logout(){
      firebase.auth().signOut();
      setisuser(false)
      setUserdata([])
    }





  return (
    <div className="index-header">
      {/* <h1>Hello , Akash Mane 👋</h1> */}
      <div className={styles.header} >
    <div style={{display:"flex" }} onClick={()=> router.push('/')}>
    <IconButton onClick={()=> setisMenu(!isMenu)} color="primary" aria-label="add to shopping cart">
                <ViewCompactIcon />
            </IconButton>
      <h1 style={{color:"white" , paddingTop:"7px"}}>WorkSpace</h1>
      </div>
      
    </div>
      <div>

        {isuser ? (
          <>
        {/* <IconButton>
         <Badge color="secondary" badgeContent={2} style={{position:"relative" , left:-10}}> 
          <NotificationsNoneIcon style={{color:"orangered" , position:"relative" , left:10 ,marginRight:10  , borderRadius:20 ,padding:3 , fontSize:30  }} />  
        </Badge>
        </IconButton> */}
        {Userdata.displayName ? Userdata.displayName : Userdata.email }
<Popconfirm
title={Userdata.email} 
onConfirm={logout}
// onCancel={cancel}
okText="Logout"
// cancelText="No"
>
        <IconButton>
          {Userdata.photoURL ? ( 

          <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        style={{  }}
        >
        <Avatar style={{ height:30 , width:30 }} alt={Userdata.displayName} src={Userdata.photoURL} />
      </StyledBadge>

          ):(
            <Avatar style={{ height:30 , width:30 }} {...stringAvatar(Userdata.email)} />            
          )}
      </IconButton>
      </Popconfirm>
      </>
        ) : (


        <Button onClick={logout} variant="text" style={{ color: "green", marginLeft: 20 }}>
          Welocme  👋
        </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
