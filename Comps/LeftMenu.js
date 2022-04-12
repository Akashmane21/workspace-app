import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import Button from "@mui/material/Button";
import Nav from "./Nav";
import { useRouter } from "next/router";
import ArticleIcon from '@mui/icons-material/Article';
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import GridOnIcon from '@mui/icons-material/GridOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import BookIcon from '@mui/icons-material/Book';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
export default function LeftMenu({ active }) {
  const router = useRouter();

  return (
    <>

      <div
        className="LeftMenu"
        style={{
          backgroundColor: "#011229c9",
        }}
      >
        <Nav />
        {/* <hr /> */}
        <Button
          onClick={() => router.push("/")}
          startIcon={<BlurLinearIcon  className="lefticon" />}
          variant="text"
          style={{
            color: active == "Dashboard" ? "orangered" : "white",
            marginLeft: 20,
            backgroundColor : active == "Dashboard" ? "#ffffff1b" : "#ffffff00",
            borderLeft: active == "Dashboard" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          Dashboard
        </Button>
        <br />
        <Button
          onClick={() => router.push("/Workspace")}
          variant="text"
          startIcon={<ViewCompactIcon className="lefticon" />}
          style={{
            color: active == "Workspace" ? "orangered" : "white",
            backgroundColor : active == "Workspace" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Workspace" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
        
          Workspace
        </Button>
        <br />
        <Button
          onClick={() => router.push("/Calender")}
          variant="text"
          startIcon={<EventNoteIcon className="lefticon" />}
          style={{
            color: active == "Calender" ? "orangered" : "white",
            backgroundColor : active == "Calender" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Calender" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {/* <ion-icon
          className="lefticon"
            style={{ marginRight: 8, fontSize: 19 , backgroundColor:"gray" , borderRadious:10  }}
            name="calendar-outline"
          ></ion-icon>{" "} */}
          Calender
        </Button>
        <br />
        <Button
          onClick={() => router.push("/Apps")}
          variant="text"
          startIcon={<CallToActionIcon className="lefticon" />}
          style={{
            color: active == "Apps" ? "orangered" : "white",
            backgroundColor : active == "Apps" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Apps" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {" "}
          {/* <ion-icon
            style={{ marginRight: 10, fontSize: 17 }}
            name="wallet-outline"
          ></ion-icon> */}
          All Apps
        </Button>
        <br />
        <Button
          onClick={() => router.push("/Expense")}
          variant="text"
          startIcon={<MonetizationOnIcon className="lefticon" />}
          style={{
            color: active == "Expense" ? "orangered" : "white",
            backgroundColor : active == "Expense" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Expense" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {" "}
          {/* <ion-icon
            style={{ marginRight: 10, fontSize: 17 }}
            name="card-outline"
          ></ion-icon> */}
          Expence
           {/* Tracker */}
        </Button>
        <br />
        <Button
          onClick={() => router.push("/Docs")}
          variant="text"
          startIcon={<ArticleIcon className="lefticon" />}
          style={{
            color: active == "Docs" ? "orangered" : "white",
            backgroundColor : active == "Docs" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Docs" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {" "}
         
         Docs
        </Button>

        <Button
          onClick={() => router.push("/Blogs")}
          variant="text"
          startIcon={<BookIcon className="lefticon" />}
          style={{
            color: active == "Blogs" ? "orangered" : "white",
            backgroundColor : active == "Blogs" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Blogs" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {" "}
         
         Blogs
        </Button>


        <br />
        <Button
          onClick={() => router.push("/Sheets")}
          variant="text"
          startIcon={<GridOnIcon className="lefticon" />}
          style={{
            color: active == "Sheets" ? "orangered" : "white",
            backgroundColor : active == "Sheets" ? "#ffffff1b" : "#ffffff00",
            marginLeft: 20,
            borderLeft: active == "Sheets" ? "2px solid #fc3802" :"2px solid #ffffff00"
          }}
        >
          {" "}
          
          Work Sheets
        </Button>
        <br />
      </div>
    </>
  );
}
