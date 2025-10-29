import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import DehazeIcon from "@mui/icons-material/Dehaze";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FlightIcon from "@mui/icons-material/Flight";
import AppBar from "@mui/material/AppBar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link, Modal, Collapse, ListItemButton } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormAuth from "../../modules/Authentification/components/FormAuth";
import image from "../../assets/images/logo66.png";
import image2 from "../../assets/images/logo2111.png";
import JwtUtils from "../../routing/JwtUtils";
import config from "../Config";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Stack from "@mui/material/Stack";
import BoltIcon from "@mui/icons-material/Bolt";

import * as alarmeActions from "../../modules/alarme/state/AlarmeActions";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
//icons
import BalisageOn from "../../assets/images/IconsForPages/IconBalisage.png";
import BalisageOff from "../../assets/images/IconsForPages/IconBalisageHover.png";
import EclairageOn from "../../assets/images/IconsForPages/IconEclairage.png";
import EclairageOff from "../../assets/images/IconsForPages/IconEclairageHover.png";
import communicationOn from "../../assets/images/IconsForPages/IconComm.png";
import communicationOff from "../../assets/images/IconsForPages/IconCommHover.png";
import RégulateurOn from "../../assets/images/IconsForPages/IconReg.png";
import RégulateurOff from "../../assets/images/IconsForPages/IconRegHover.png";
import "moment/locale/fr"; // Import French locale

import audio from "../../assets/audio/audio.m4a";
const pages = [
  {
    title: "Balisage ",
    onImage: BalisageOn,
    offImage: BalisageOff,
    pageURL: "/Balisage",
  },
  {
    title: "Eclairage ",
    onImage: EclairageOn,
    offImage: EclairageOff,
    pageURL: "/Eclairage",
  },
  {
    title: "communication ",
    onImage: communicationOn,
    offImage: communicationOff,
    pageURL: "/Etat-de-communication",
  },
  {
    title: "Régulateur",
    onImage: RégulateurOn,
    offImage: RégulateurOff,
    pageURL: "/Régulateur",
  },
  {
    title: "Alarmes ",
    icon: <ReportProblemIcon style={{ padding: 7.5 }} />,
    pageURL: "/Alarmes",
  },
  {
    title: "Historique ",
    icon: <HistoryToggleOffIcon style={{ padding: 7.5 }} />,
    pageURL: "/Historique",
  },
  {
    title: "ELEC ",
    icon: <BoltIcon style={{ padding: 7.5 }} />,
    pageURL: "/Electricite",
  },
];

const settings = [{ title: "Info", icon: <ManageAccountsIcon /> }];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // state variables with initial value null
  const [anchorElNav, setAnchorElNav] = useState(null); // state variable to keep track of clicked Nav anchor element
  const [anchorElUser, setAnchorElUser] = useState(null); // state variable to keep track of clicked User anchor element
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(JwtUtils.isActif());
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  let history = useHistory();
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // functions to handle user logout
  const handleLogout = () => {
    let payload = { id: jwt.decode(sessionStorage.getItem("token")).sub };
    const request = {
      payload,
      successCallBack: (response) => { },
      failCallBack: (error) => { },
    };
    dispatch(alarmeActions.DeconnecterStart(request));
    JwtUtils.logOut();
  };

  // Define functions to handle different events
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
    // function to change the URL using useHistory hook from 'react-router-dom'
  };

  moment.locale("fr");
  //time
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, HH:mm").replace(/(^|\s)\S/g, function (match) {
      return match.toUpperCase();
    })
  );
  const audioRef = useRef(new Audio(audio));
  //time
  useEffect(() => {
    const handleInterval = () => {
      setCurrentTime(
        moment().format("MMMM Do YYYY, HH:mm").replace(/(^|\s)\S/g, function(match) {
          return match.toUpperCase();
        })
      );
      if (sessionStorage.getItem("token") && !JwtUtils.isActif()) {
        setLoggedIn(JwtUtils.isActif());
        JwtUtils.logOutWithoutRefresh();
        alert(
          "Votre session est terminée pour des raisons de sécurité. Veuillez vous reconnecter "
        );
      }
    };
    const intervalId = setInterval(handleInterval, 1000);
    return () => clearInterval(intervalId);
  }, []);
  ////blink
  const alarmeState = useSelector((state) => state.Alarmes?.alarmes);
  const blinkCheck = alarmeState.find(
    (alarme) =>
      (!alarme?.solved && !alarme?.acquittement) ||
      (alarme?.acquittement && !alarme?.solved)
  );
  const regBlinkCheck = useSelector((state) => state?.Zone.zones)?.some(
    (zone) =>
      zone?.equipements?.some((equipement) =>
        equipement?.items?.some((item) => item?.ValeurRealTime)
      )
  );
  const commRegCheck = useSelector(
    (state) => state?.Communicator?.communicators
  )?.some((machine) => machine?.ipAdress?.some((ipAdres) => !ipAdres?.status));

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    };

    let intervalId;

    if (blinkCheck) {
      playAudio();

      // Optional: Check if audio is still playing and replay if stopped
      intervalId = setInterval(() => {
        if (audioRef.current.paused) {
          playAudio();
        }
      }, 1000); // Check every second to ensure audio is playing
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [blinkCheck, audioRef]);

  const [selectedBtn, setSelectedBtn] = React.useState(-1);
  let location = useLocation();

  let role = jwt.decode(sessionStorage.getItem("token"))?.role;
  let chefSuper = jwt.decode(sessionStorage.getItem("token"))?.Is_Super;
  let Username = jwt.decode(sessionStorage.getItem("token"))?.username;

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "rgb(53, 71, 115)",
      },
      children: `${name.split(" ")[0][0]}`,
      // `${name.split(' ')[1][0]}
    };
  }

  return (
    <AppBar
      id="navbar"
      sx={{
        backgroundColor: "#000d20 !important",
        height: "auto",
        position: "absolute",
        whiteSpace: "nowrap",
        overflow: "hidden",
        minWidth: "300px",
        width: "100%",
        padding: "0px",
      }}
    >
      <Container maxWidth="default" sx={{ padding: "0px" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0px",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              height: "auto",
            }}
          >
            {/* <img alt="" src={image} style={{ maxWidth: "156px"  }} /> */}
            <img
              alt="LT_Logo"
              src={image}
              style={{ maxHeight: "70px", marginRight: "auto" }}
            />
          </Box>
          <Box
            sx={{
              fontFamily:
                "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",

              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <Box
              sx={{
                marginRight: "5px",
                cursor: "pointer",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {/* <img alt="" src={image} style={{ width: "156px", height: "auto", minHeight: "auto"}} /> */}
              <img
                alt=""
                src={image}
                style={{ width: "70px", height: "auto", minHeight: "auto" }}
              />
            </Box>
            <IconButton
              sx={{
                "&:hover": {
                  color: "#a12248",
                  width: "80px",
                },
              }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FlightIcon />
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => {
                let content;
                if (index < 4) {
                  // First four items will use images
                  const isCurrentPage =
                    location.pathname.toLowerCase() ===
                    page.pageURL.toLowerCase();
                  const imageToShow = isCurrentPage
                    ? page.onImage
                    : page.offImage;
                  content = (
                    <img src={imageToShow} alt={page.title} width="32px" />
                  );
                } else {
                  // Remaining items will use icons
                  content = <ListItemIcon>{page.icon}</ListItemIcon>;
                }

                if (role === "Agent_supervision" || role === undefined) {
                  if (index < 5) {
                    return (
                      <MenuList key={page.title}>
                        <MenuItem
                          sx={{
                            fontFamily:
                              "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                            FontSize: "14px",
                            backgroundColor:
                              selectedBtn === index ? "#9EC1F4" : null,
                            color: selectedBtn === index ? "#003285" : null,
                            animationName:
                              selectedBtn === 0 ? "$blinker" : null,
                            animationDuration: selectedBtn === 0 ? "1s" : null,
                            animationTimingFunction:
                              selectedBtn === 0 ? "steps(2, start)" : null,
                            animationIterationCount:
                              selectedBtn === 0 ? "'infinite'" : null,

                            "@global": {
                              "@keyframes blinker": {
                                //   from: { opacity: 1 },
                                to: { visibility: "hidden" },
                              },
                            },
                            "&:hover": {
                              color: "#003285",
                              backgroundColor: "#9EC1F4",
                            },
                          }}
                          button="true"
                          key={page.title}
                          onClick={() => {
                            handleButtonClick(page.pageURL);
                            setSelectedBtn(index);
                          }}
                        >
                          {content}
                          <ListItemText>{page.title}</ListItemText>
                        </MenuItem>
                      </MenuList>
                    );
                  }
                  return null;
                }
                return (
                  <MenuList key={page.title}>
                    <MenuItem
                      sx={{
                        fontFamily:
                          "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                        FontSize: "14px",
                        backgroundColor:
                          selectedBtn === index ? "#9EC1F4" : null,
                        color: selectedBtn === index ? "#003285" : null,
                        animationName: selectedBtn === 0 ? "$blinker" : null,
                        animationDuration: selectedBtn === 0 ? "1s" : null,
                        animationTimingFunction:
                          selectedBtn === 0 ? "steps(2, start)" : null,
                        animationIterationCount:
                          selectedBtn === 0 ? "'infinite'" : null,

                        "@global": {
                          "@keyframes blinker": {
                            //   from: { opacity: 1 },
                            to: { visibility: "hidden" },
                          },
                        },
                        "&:hover": {
                          color: "#003285",
                          backgroundColor: "#9EC1F4",
                        },
                      }}
                      button="true"
                      key={page.title}
                      onClick={() => {
                        handleButtonClick(page.pageURL);
                        setSelectedBtn(index);
                      }}
                    >
                      {content}
                      <ListItemText>{page.title}</ListItemText>
                    </MenuItem>
                  </MenuList>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily:
                "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {pages
              .slice(
                0,
                role === "Agent_supervision" || role === undefined
                  ? 5
                  : pages.length
              )
              .map((page, index) => {
                let content;
                if (index < 4) {
                  const isCurrentPage =
                    location.pathname.toLowerCase() ===
                    page.pageURL.toLowerCase();
                  const imageToShow = isCurrentPage
                    ? page.onImage
                    : page.offImage;
                  content = (
                    <img src={imageToShow} alt={page.title} width="32px" />
                  );
                } else {
                  content = page.icon;
                }

                const isAgentSupervisionOrUndefined =
                  role === "Agent_supervision" || role === undefined;
                const isClickable = isAgentSupervisionOrUndefined && index < 2;

                return (
                  <Button
                    variant="secondary"
                    key={page.title}
                    onClick={() => {
                      if (isClickable || !isAgentSupervisionOrUndefined) {
                        handleButtonClick(page.pageURL);
                        setSelectedBtn(index);
                      }
                    }}
                    sx={{
                      "@keyframes blinker": {
                        from: { opacity: 1.0 },
                        to: { opacity: 0.0 },
                      },
                      backgroundColor:
                        (index === 4 && blinkCheck) ||
                          (regBlinkCheck && index === 3) ||
                          (commRegCheck && index === 2)
                          ? "red"
                          : selectedBtn === index ||
                            location.pathname.toLowerCase() ===
                            page.pageURL.toLowerCase()
                            ? "#9EC1F4"
                            : null,
                      color:
                        (index === 4 && blinkCheck) ||
                          (regBlinkCheck && index === 3) ||
                          (commRegCheck && index === 2)
                          ? "white"
                          : selectedBtn === index
                            ? "#003285"
                            : null,
                      animation:
                        (index === 4 && blinkCheck) ||
                          (regBlinkCheck && index === 3) ||
                          (commRegCheck && index === 2)
                          ? index === 4
                            ? " blinker 1.7s linear infinite"
                            : null
                          : null,
                      my: 2,
                      display: "block",
                      margin: "1px 6px 1px 0px",
                      fontFamily:
                        "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                      cursor:
                        isAgentSupervisionOrUndefined && index >= 2
                          ? "default"
                          : "pointer", // Set cursor to default for non-clickable buttons when role is "Agent_supervision" or undefined
                      "&:hover": {
                        color:
                          isAgentSupervisionOrUndefined && index >= 2
                            ? null
                            : "#003285",
                        backgroundColor:
                          isAgentSupervisionOrUndefined && index >= 2
                            ? null
                            : "#9EC1F4",
                      },
                    }}
                  >
                    {content}
                    <br />
                    {page.title}
                  </Button>
                );
              })}

            <Box sx={{ padding: "0px 20px", direction: "ltr" }}>
              {currentTime}
            </Box>
            {loggedIn ? (
              <IconButton
                size="small"
                aria-label="account user"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                component="a"
                href="/"
                onClick={handleLogout}
                sx={{
                  borderRadius: "4px",
                  marginRight: "5px",
                  cursor: "pointer",
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  "&:hover": { backgroundColor: "#9EC1F4", color: "#003285" },
                }}
              >
                <AccountCircleIcon />
                <Typography
                  sx={{
                    fontFamily:
                      "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                    marginLeft: "7px",
                  }}
                >
                  Deconnecter { }
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                size="small"
                aria-label="account user"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                onClick={handleOpen}
                sx={{
                  borderRadius: "4px",
                  marginRight: "5px",
                  cursor: "pointer",
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  "&:hover": { backgroundColor: "#9EC1F4", color: "#003285" },
                }}
              >
                <AccountCircleIcon />
                <Typography
                  sx={{
                    fontFamily:
                      "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                    marginLeft: "4px",
                  }}
                >
                  Se connecter { }
                </Typography>
              </IconButton>
            )}
            <Tooltip title="À propos">
              <DehazeIcon
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  cursor: "pointer",
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  "&:hover": { color: "#003285" },
                }}
              >
                <Avatar alt="À propos" src="/static/images/avatar/2.jpg" />
              </DehazeIcon>
            </Tooltip>
            <Menu
              sx={{ mt: "45px ", marginLeft: "-75px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  background="red !important"
                  key={setting.title}
                  sx={{
                    fontFamily:
                      "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                    background: "white !important",
                  }}
                >
                  <Box>
                    {loggedIn ? (
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        padding="12px"
                      >
                        <Avatar {...stringAvatar(Username.toUpperCase())} />
                      </Stack>
                    ) : null}

                    <Box display="flex">
                      <Typography
                        fontFamily="Inter"
                        color="rgb(53, 71, 115)"
                        width="100%"
                        textAlign="center"
                        fontSize="19px"
                        fontWeight="700"
                        lineHeight="normal"
                      >
                        {chefSuper
                          ? "CHEF_SUPERVISION"
                          : role
                            ? role.toUpperCase()
                            : ""}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color="rgb(53, 71, 115)"
                      fontWeight="700"
                      textAlign="center"
                      fontFamily="Inter"
                      fontSize="18px"
                      lineHeight="normal"
                    >
                      {Username
                        ? Username.charAt(0).toUpperCase() + Username?.slice(1)
                        : ""}
                    </Typography>
                    {role === "Admin" || chefSuper ? (
                      <IconButton
                        size="small"
                        aria-haspopup="false"
                        href="/macros"
                        sx={{
                          borderRadius: "4px",
                          marginRight: "5px",
                          cursor: "pointer",
                          fontFamily:
                            "Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                          color: "white",
                          backgroundColor: "rgb(53, 71, 115)",
                          width: "100%",
                          height: "46px",
                          fontWeight: "500",
                          fontSize: "16px",
                          margin: "5px 0px 5px",
                          "&:hover": {
                            backgroundColor: "#9EC1F4",
                            color: "rgb(53, 71, 115)",
                          },
                        }}
                      >
                        <AccountCircleIcon />
                        <Typography
                          sx={{
                            fontFamily:
                              "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                            marginLeft: "4px",
                          }}
                        >
                          Macros
                        </Typography>
                      </IconButton>
                    ) : null}
                    <ListItemButton onClick={handleClick}>
                      <ListItemText>{setting.title}:</ListItemText>
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isOpen}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        style={{ color: "rgb(53, 71, 115)" }}
                      >
                        {"Copyright © "}
                        <Link color="inherit" href="">
                          Projet_LT
                          <br /> Developed by ADS
                        </Link>
                        {" " + new Date().getFullYear()} <br />
                        {" Version" + config.appVersion}
                      </Typography>
                    </Collapse>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              marginRight: "20px",
              direction: "ltr",
              display: { xs: "flex", md: "none" },
            }}
          >
            {currentTime}
          </Box>
          {loggedIn ? (
            <IconButton
              size="small"
              aria-label="account user"
              aria-controls="menu-appbar"
              aria-haspopup="false"
              color="inherit"
              component="a"
              href="/"
              onClick={handleLogout}
              sx={{
                borderRadius: "4px",
                marginRight: "5px",
                cursor: "pointer",
                fontFamily:
                  "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                "&:hover": { backgroundColor: "#9EC1F4", color: "#003285" },
                display: { xs: "flex", md: "none" },
              }}
            >
              <AccountCircleIcon />
              <Typography
                sx={{
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  marginLeft: "7px",
                }}
              >
                Deconnecter { }
              </Typography>
            </IconButton>
          ) : (
            <IconButton
              size="small"
              aria-label="account user"
              aria-controls="menu-appbar"
              aria-haspopup="false"
              color="inherit"
              onClick={handleOpen}
              sx={{
                borderRadius: "4px",
                marginRight: "5px",
                cursor: "pointer",
                fontFamily:
                  "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                "&:hover": { backgroundColor: "#9EC1F4", color: "#003285" },
                display: { xs: "flex", md: "none" },
              }}
            >
              <AccountCircleIcon />
              <Typography
                sx={{
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  marginLeft: "4px",
                }}
              >
                Se connecter { }
              </Typography>
            </IconButton>
          )}
          <Tooltip title="À propos">
            <DehazeIcon
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                cursor: "pointer",
                fontFamily:
                  "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                "&:hover": { color: "#003285" },
                display: { xs: "flex", md: "none" },
              }}
            >
              <Avatar alt="À propos" src="/static/images/avatar/2.jpg" />
            </DehazeIcon>
          </Tooltip>
          <Menu
            sx={{
              mt: "45px ",
              marginLeft: "-75px",
              display: { xs: "flex", md: "none" },
            }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                background="red !important"
                key={setting.title}
                sx={{
                  fontFamily:
                    "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                  background: "white !important",
                }}
              >
                <Box>
                  {loggedIn ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      padding="12px"
                    >
                      <Avatar {...stringAvatar(Username.toUpperCase())} />
                    </Stack>
                  ) : null}

                  <Box display="flex">
                    <Typography
                      fontFamily="Inter"
                      color="rgb(53, 71, 115)"
                      width="100%"
                      textAlign="center"
                      fontSize="19px"
                      fontWeight="700"
                      lineHeight="normal"
                    >
                      {chefSuper
                        ? "CHEF_SUPERVISION"
                        : role
                          ? role.toUpperCase()
                          : ""}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    color="rgb(53, 71, 115)"
                    fontWeight="700"
                    textAlign="center"
                    fontFamily="Inter"
                    fontSize="18px"
                    lineHeight="normal"
                  >
                    {Username
                      ? Username.charAt(0).toUpperCase() + Username?.slice(1)
                      : ""}
                  </Typography>
                  {role === "Admin" || chefSuper ? (
                    <IconButton
                      size="small"
                      aria-haspopup="false"
                      href="/macros"
                      sx={{
                        borderRadius: "4px",
                        marginRight: "5px",
                        cursor: "pointer",
                        fontFamily:
                          "Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                        color: "white",
                        backgroundColor: "rgb(53, 71, 115)",
                        width: "100%",
                        height: "46px",
                        fontWeight: "500",
                        fontSize: "16px",
                        margin: "5px 0px 5px",
                        "&:hover": {
                          backgroundColor: "#9EC1F4",
                          color: "rgb(53, 71, 115)",
                        },
                      }}
                    >
                      <AccountCircleIcon />
                      <Typography
                        sx={{
                          fontFamily:
                            "Times New Roman ,Circular Pro,-Apple-System, .SFNSText-Regular,San Francisco,Segoe UI",
                          marginLeft: "4px",
                        }}
                      >
                        Macros
                      </Typography>
                    </IconButton>
                  ) : null}
                  <ListItemButton onClick={handleClick}>
                    <ListItemText>{setting.title}:</ListItemText>
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={isOpen}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                      style={{ color: "rgb(53, 71, 115)" }}
                    >
                      {"Copyright © "}
                      <Link color="inherit" href="">
                        Projet_LT
                        <br /> Developed by ADS
                      </Link>
                      {" " + new Date().getFullYear()} <br />
                      {" Version" + config.appVersion}
                    </Typography>
                  </Collapse>
                </Box>
              </MenuItem>
            ))}
          </Menu>
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              height: "auto",
              marginLeft: "auto",
            }}
          >
            <img
              alt=""
              src={image2}
              style={{ maxHeight: "70px", paddingLeft: "1rem" }}
            />
          </Box>
        </Toolbar>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormAuth />
        </Box>
      </Modal>
      {children}
    </AppBar>
  );
};
export default Navbar;