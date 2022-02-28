import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import LoadingButton from '@mui/lab/LoadingButton';

  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
import List from '../Context/MovieList';
import { useState ,useEffect } from 'react'
import CustomizedHook from '../Comps/Keywords';

import Switch from '@mui/material/Switch';

// FLoating button
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';


// CheckBoxes
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// Rating
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Select Items'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormControlLabel from '@mui/material/FormControlLabel';


const Input = styled('input')({
    display: 'none',
  });

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

function Mui() {
   


    const [loading, setLoading] = useState(false);
    const [top100Films, settop100Films] = useState([]);
    const [islike, setislike] = useState(false);


    useEffect(() => {
        settop100Films(List)
     console.log(List);
    }, [])
    
    function handleClick() {
      setLoading(true);
      setTimeout(function(){
        setLoading(false);
    }, 5000);
    }

    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.year,
      };

      const options = top100Films.map((option) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };

      })

    function Like(){
        setislike(!islike)
        setTimeout(function(){
            toast(islike.toString())
                }, 2000);
        
       
    }
   
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
      });

      const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    toast(event.target.value)
  };

  const [theme, settheme] = useState(false)
  return (
    <div style={{color:theme ? "black" : "white"}}>
    <Head>
        <title>Material UI</title>
        <meta name="MUI COmponents" content="Examples of Material Ui Components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="main" style={{ transition : "1s backgroundColor"  , backgroundColor:theme ? "white" : "#011229c9"   , padding:"20px"}}>
        <h1>Material UI Components</h1>
        <FormControlLabel
        onChange={()=>settheme(!theme)}
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label={theme ? "Light Theme" : "Dark Theme"}
      />
        <details>
            <summary>Buttons</summary>
            <p>
            <Button variant="text" size="median" className='but'>Text</Button>
            {/* variant : - contained , outlined*/}

            <Button>Primary</Button>
            <Button disabled>Disabled</Button>
            <Button href="#text-buttons">Link</Button>
           
            {/* colors */}
            <Button color="secondary">Secondary</Button>
            <Button variant="contained" color="success">
            Success
            </Button>
            <Button variant="outlined" color="error">
            Error
            </Button>

            {/* Files */}
           
            <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
            </label>

            {/* Buttons with Icons */}
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Button onClick={()=> alert("Send Method Called")} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>

            {/* Icon Button */}
            <IconButton onClick={()=> toast("Added to cart !")} color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>
            <IconButton aria-label="fingerprint" color="success">
                <Fingerprint />
            </IconButton>
            <IconButton  onClick={()=> toast("Figerprint !")} aria-label="fingerprint" color="secondary">
            <Fingerprint />
        </IconButton>

        <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>

            </p>
        </details>
        

        <details>
            <summary>AutoComplete</summary>
            <p>
            {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
          
                onInputChange={(event, newInputValue) => {
                toast(newInputValue)

                }}
            sx={{ width: 300 }}
            // freeSolo
            options={top100Films.map((option) => option.label)}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            /> */}

            <Autocomplete
                    {...defaultProps}
                    id="include-input-in-list"
                    includeInputInList
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="includeInputInList" variant="standard" />
                    )}
                />
            <br />
            <Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="With categories" />}
            />

            <CustomizedHook />
            </p>
        </details>

        <details>
            <summary>Floating Buttons</summary>
            <p> <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab variant="extended" onClick={()=>  toast("Navigation Button Pressed")}  size="small" color="primary" aria-label="add">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      </p>
        </details>


        <details>
            <summary>Like or Bookarks</summary>
            <p>
            <div>
                <Checkbox onChange={()=>Like()} checked={islike} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red"}} />} />
                <Checkbox
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                />
                </div>


            </p>
        </details>


        <details>
            <summary>Rating Stars</summary>
            <p>
            <Rating name="half-rating" 
            onChange={(event, newValue) => {
          toast(newValue)
            }}
            // onChangeActive={(event, newHover) => {
            //     toast(newHover);
            // }}
            defaultValue={2.5}  precision={0.5} />

            <br />

        <Typography component="legend">Custom icon and color</Typography>
            <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                onChange={(event, newValue) => {
          toast(newValue)
            }}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
            <br />
            <Typography component="legend">10 stars</Typography>
      <Rating name="customized-10" defaultValue={2} max={10} />
            </p>
        </details>


            <details>
                <summary>Select</summary>
                <p>
                <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
                </p>
            </details>

        <ToastContainer
             position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
<ToastContainer />
</div>
    </div>
    
  )
}

export default Mui