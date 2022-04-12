import Head from "next/head";
import Nav from "../Nav";
import styles from "../../styles/Home.module.scss";
import { useCounter } from "../../Context/Context";
import firebase from "../../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Links from "../Links";
import Notes from "../Notes";
import Files from "../Files";
import Todos from "../Todos";
// Create New Collection
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Modal from "@mui/material/Modal";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import { Badge, Card } from 'antd';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



function Workspace() {
    const { query } = useRouter();
    const [openmodel, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const card = [
      {
        Title: "Organization",
        Image:
          "https://img.freepik.com/free-vector/human-relations-abstract-concept-vector-illustration-career-success-publicrelations-businessman-handshake-team-building-cooperation-participation-human-resources-company-abstract-metaphor_335657-1421.jpg?t=st=1647844666~exp=1647845266~hmac=2695386021e59ebfa524db1574a1a8a685dafc2aa49831f6eb657ea27b9a5918&w=740",
      },
      {
        Title: "Collage",
        Image:
          "https://image.freepik.com/free-vector/colored-university-building-illustration_81894-1893.jpg",
      },
      {
        Title: "Univercity",
        Image:
          "https://img.freepik.com/free-vector/flat-university-concept_23-2148172741.jpg?w=740",
      },
      {
        Title: "Personal",
        Image:
          "https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
      },
      {
        Title: "Study",
        Image:
          "https://img.freepik.com/free-vector/flat-young-woman-playing-videogames_23-2148234598.jpg?t=st=1647845404~exp=1647846004~hmac=571f3b83440dc13ba98e770d3683e42986f2f87a6e1b6f8558b8274e8cebc5d9&w=740",
      },
      {
        Title: "Assignments",
        Image:
          "https://img.freepik.com/free-vector/studying-concept-illustration_114360-1301.jpg?t=st=1647845532~exp=1647846132~hmac=2ff3a4cb76b3d4cd6f68dfa04c2b78c678be15685cf7c743a23b8b371960d75d&w=740",
      },
      {
        Title: "Shopping",
        Image:
          "https://i.pinimg.com/736x/1c/08/d5/1c08d5cee30f86828388797a2e132150.jpg",
      },
      {
        Title: "My_work",
        Image:
          "https://img.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_10045-646.jpg?t=st=1647845683~exp=1647846283~hmac=4acf45dcdbf5742b4ff7983bbcc2c419f098962085f6f99dc8209d3827ea98c6&w=740",
      },
      {
        Title: "Design",
        Image:
          "https://mir-s3-cdn-cf.behance.net/project_modules/disp/8bdc8d46432957.5853cecb475e5.png",
      },
      {
        Title: "Fashion",
        Image:
          "https://i.pinimg.com/originals/21/78/34/21783472a8310aad853238fd7ad11f46.jpg",
      },
      {
        Title: "Shopping",
        Image: "https://cdn.dribbble.com/users/523924/screenshots/4835911/14.png",
      },
      {
        Title: "My Diary",
        Image:
          "https://static.vecteezy.com/system/resources/previews/000/389/991/original/simple-illustration-of-a-girly-diary-vector.jpg",
      },
      {
        Title: "Movie Time",
        Image:
          "  https://media.istockphoto.com/vectors/movie-time-poster-cartoon-vector-illustration-cinema-motion-picture-vector-id530807928?k=6&m=530807928&s=170667a&w=0&h=7lP-BDsbQYON_PYKxZaheRGbKK_K8y1473GiqTQdswY=",
      },
      {
        Title: "Expance Manage",
        Image:
          "https://static.vecteezy.com/system/resources/previews/001/222/573/original/modern-flat-save-money-illustration-concept-vector.jpg",
      },
      {
        Title: "Games",
        Image:
          "https://image.freepik.com/free-vector/character-playing-videogame_23-2148540059.jpg",
      },
      {
        Title: "Games",
        Image:
          "https://img.freepik.com/free-vector/character-playing-videogame-concept_23-2148535175.jpg?w=740",
      },
  
      {
        Title: "MySpace",
        Image:
          "https://img.freepik.com/free-vector/best-estimate-performance_132971-39.jpg?w=900",
      },
      {
        Title: "Friends",
        Image:
          "https://img.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg?t=st=1647845875~exp=1647846475~hmac=4e199bf56a2cffee086b57b8575b7fef618ca1e2030e497f4e6ada947c0f4789&w=740",
      },
      {
        Title: "Family",
        Image:
          "https://img.freepik.com/free-vector/international-day-families-concept-illustration_114360-5350.jpg?t=st=1647843315~exp=1647843915~hmac=f9a98a6081ecdce915e35846800d1791cdf2a4ba6bf91351ec99eaf601495ff6&w=740",
      },
      {
        Title: "Family",
        Image:
          "https://img.freepik.com/free-vector/family-grandparents-parents-kids-cartoons_18591-52187.jpg?t=st=1647843315~exp=1647843915~hmac=008e3d693700f97b81793b9bcf7bc000a7874c35f3b89860c1a2d9bb0eb163f8&w=740",
      },
      {
        Title: "Travel",
        Image:
          "https://img.freepik.com/free-vector/vacation-holidays-background-with-realistic-globe-suitcase-photo-camera_1284-10476.jpg?t=st=1647845648~exp=1647846248~hmac=6b17c9cdcbd60a1267415c8e0109f0394fb9bbda66f76dcabeb0289cfa275803&w=740",
      },
      {
        Title: "Travel",
        Image:
          "https://img.freepik.com/free-vector/flat-travel-background_23-2148043314.jpg?t=st=1647845648~exp=1647846248~hmac=26c1bf4248792c4b7cf75387a743ff0e7637cf6158b5c081f8ce5105b6c69654&w=740",
      },
      {
        Title: "Travel Journey",
        Image:
          "https://img.freepik.com/free-vector/trip-concept-illustration_114360-1247.jpg?t=st=1647845648~exp=1647846248~hmac=aa51bb4a76312e7d7b5724d37d0d194b5e05ecb44538b1a41268cb7d13568dac&w=740",
      },
      {
        Title: "Team",
        Image:
          "https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?t=st=1647844666~exp=1647845266~hmac=1d782bf9f9f58e94f6538713251896bd2f845ce0cb469822d4187a323b115783&w=826",
      },
      {
        Title: "Shopping List",
        Image:
          "https://img.freepik.com/free-vector/reading-list-concept-illustration_114360-1090.jpg?t=st=1647846353~exp=1647846953~hmac=ee53f278f7151b6a4a5853f6141d19a8313a1acdc1546d3f1212d956c3140148&w=740",
      },
      {
        Title: "Study Resources",
        Image:
          "https://img.freepik.com/free-vector/business-man-dealing-multi-task-new-idea-working-laptop-concept-business-goals-success-satisfying-achievement_1150-39767.jpg?t=st=1647846353~exp=1647846953~hmac=6831f79c6638e4da33c9620b0178d345415da06a3ceb7fb4cc9629b7f0237490&w=740",
      },
      {
        Title: "Expense Track",
        Image:
          "https://img.freepik.com/free-vector/electronic-documentation-man-with-registration-checking-repository-log-online-approval-screen-form-validation-page-expense-chronicles-vector-isolated-concept-metaphor-illustration_335657-4323.jpg?t=st=1647846520~exp=1647847120~hmac=1a2bddef08858117ba1208d2a25ceb44cc8381013ce2246da1cbfd94939f591f&w=740",
      },
      {
        Title: "College",
        Image:
          "https://img.freepik.com/free-vector/people-studying-remotely-e-learning-home-education-distance-learning-online-college_335657-3297.jpg?t=st=1647846602~exp=1647847202~hmac=b546110775b03bb4bd7c55c2f2de014ba1d2b04b96ce07829ee772e96054040e&w=740",
      },
      {
        Title: "Collage Work",
        Image:
          "https://img.freepik.com/free-vector/people-studying-remotely-e-learning-home-education-distance-learning-online-college-university-students-with-laptops-internet-training-courses_335657-3469.jpg?w=740",
      },
      {
        Title: "Music",
        Image:
          "https://img.freepik.com/free-vector/elegant-musical-notes-music-chord-background_1017-20759.jpg?t=st=1647846753~exp=1647847353~hmac=7a2644d872751a39d255677c66954fb2f672b1a56512d45c2bdf8996aeb1a29b&w=740",
      },
    ];
  
    const [fullopen, setfullOpen] = useState(true);
    const handlefullClose = () => {
      setfullOpen(false);
    };
    const handlefullToggle = () => {
      setfullOpen(!fullopen);
    };
  
    // const { isTheme , isMenu , Open_Coll, setOpen_Coll , All_data , setAll_data} = useCounter();
    const {
    
      setisMenu,
      All_Collection,
      uid
     
    } = useCounter();
    const [Alldata, setAlldata] = useState({
      Name: "Loading...",
      Image:
        "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fmylogo-removebg-preview.png?alt=media&token=a59224d1-787b-4f9d-94d8-204e8c7f2b3c",
    });
    const [AllLinks, setAllLinks] = useState([]);
    const [AllNotes, setAllNotes] = useState([]);
    const [AllFiles, setAllFiles] = useState([]);
    const [AllTodos, setAllTodos] = useState([]);
    const [isform, setisform] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [deleteid, setdeleteid] = useState("");
    const [value, setValue] = React.useState(0);
    const [Name, setName] = useState("My Workspace");
    const [active, setactive] = useState('Dashboard');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(() => {
      
  firebase.auth().onAuthStateChanged(async (User)=>{
    if(User)
    {
      const todoref = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/My Workspace/info`);
      todoref.on("value", (snapshot) => {
        const todos = snapshot.val();
        setfullOpen(false);
        setAlldata(todos);
        try {
          let getcomp = document.getElementById("My Workspace");
          getcomp.classList.add("active");
        } catch {
          console.log("err");
        }
      });
  
      const links = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/My Workspace/Links`);
      links.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllLinks(reversed);
      });
  
      const Notes = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/My Workspace/Notes`);
      Notes.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllNotes(reversed);
      });
  
      const Files = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/My Workspace/Files`);
      Files.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllFiles(reversed);
      });
  
      const Todos = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/My Workspace/Todos`);
      Todos.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllTodos(reversed);
      });

    }

  })
    }, []);
  
    const openall = async (name, id) => {
      setisMenu(false);
      console.log(id);
      setdeleteid(id);
      let getcomp = document.getElementById(name);
      try {
        let rem = document.getElementById(Name);
        let my = document.getElementById("My Workspace");
        rem.classList.remove("active");
        my.classList.remove("active");
  
        getcomp.classList.add("active");
      } catch {
        console.log("err");
      }
  
      setName(name);
  
      const todoref = await firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${name}/info`);
      todoref.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        setAlldata(todos);
      });
  
      const links = await firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${name}/Links`);
      links.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllLinks(reversed);
        console.log(AllLinks);
      });
  
      const Notes = await firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${name}/Notes`);
      Notes.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllNotes(reversed);
        console.log(AllLinks);
      });
  
      const Files = await firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${name}/Files`);
      Files.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllFiles(reversed);
        console.log(AllLinks);
      });
  
      const Todos = await firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${name}/Todos`);
      Todos.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        const reversed = todoList.reverse();
        setAllTodos(reversed);
        console.log(AllLinks);
      });
    };
  
    function AddNew() {
      setisform(true);
    }
  
    function AddLink() {
      setLoading(true);
  
      const todoref = firebase.database().ref(`Linksdata/${uid}/CollectionName`);
      const Collection = {
        Name: title,
        Image: image,
      };
      todoref.push(Collection);
  
      const main = firebase
        .database()
        .ref(`Linksdata/${uid}/All_Coll/${title}/info`);
      const Coll = {
        Name: title,
        Image: image,
      };
      main.set(Coll);
  
      setLoading(false);
      setisform(false);
    }
  
    async function Delete() {
      const todoref = firebase
        .database()
        .ref(`Linksdata/${uid}/CollectionName`)
        .child(deleteid);
      todoref.remove();
      toast("item is Removed");
      window.location.reload();
    }
  
  return (
    <div>
        
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fullopen}
        onClick={handlefullClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal
        open={openmodel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mt: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h1"
          >
            Are You Sure About This ?
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="h7"
            component="h4"
            sx={{ mt: 2 }}
          >
            The deleted Collection can not be recovered After Delete
          </Typography>

          <br />
          <Tooltip title="Add New Collection">
            <Button
              className="deletee"
              onClick={Delete}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Tooltip>
        </Box>
      </Modal>

      <Modal
        open={isform}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="cards">
            {card &&
              card.map((data, key) => (
                <div
                  onClick={() => {
                    settitle(data.Title);
                    setimage(data.Image);
                  }}
                  className="card"
                  key={key}
                >
                  <img src={data.Image} alt={data.Title} />
                  <h3>{data.Title}</h3>
                </div>
              ))}
          </div>
          <InputLabel htmlFor="input-with-icon-adornment">
            Collection Name
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={(e) => settitle(e.target.value)}
            value={title}
            startAdornment={
              <InputAdornment position="start">
                <DriveFileRenameOutlineIcon />
              </InputAdornment>
            }
          />
          <br />
          <br />
          <TextField
            id="input-with-icon-textfield"
            label="Image Link"
            onChange={(e) => setimage(e.target.value)}
            value={image}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhotoCamera />
                </InputAdornment>
              ),
            }}
            // variant="standard"
          />

          <br />
          <br />

          <div className="btnflex">
            <Button
              className="deletee"
              onClick={() => setisform(false)}
              variant="outlined"
              endIcon={<CloseRoundedIcon />}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={AddLink}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="outlined"
            >
              Submit
            </LoadingButton>
          </div>
        </Box>
      </Modal>

        {Alldata && (
            <>
            
              <div className="main_title">
                <img loading="lazy" src={Alldata.Image} alt={Alldata.Name} />

                <div className="deletecoll">
                  <h1>{Alldata.Name}</h1>
                  <div className="hh">
                    <Tooltip title="Delete Collection">
                      <Button
                        className="Delette"
                        style={{ border: "0px solid red" }}
                        onClick={() => handleOpen()}
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="alllex">
            <div className="add">
              <Tooltip title="Add New Collection">
                <Button
                  onClick={AddNew}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Add New
                </Button>
              </Tooltip>
            </div>

            {All_Collection ? (
              All_Collection.map((data, key) => (
                <>
                  <div
                    className="ALl_colll"
                    key={key}
                    id={data.Name}
                    onClick={() => openall(data.Name, data.id)}
                  >
                    <img loading="lazy" src={data.Image} />
                    <h1>{data.Name}</h1>
                  </div>
                </>
              ))
            ) : (
              <> </>
            )}
          </div>

          <Links Name={Name} AllLinks={AllLinks} />
          <Files Name={Name} AllFiles={AllFiles} />
          <Todos Name={Name} AllTodo={AllTodos} />
          <Notes Name={Name} AllNotes={AllNotes} />


    </div>
  )
}

export default Workspace