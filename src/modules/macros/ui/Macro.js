import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as matrixActions from "../../balisage/state/matrixActions";
import { Box, Snackbar, Alert, Button, Slide, DialogTitle } from '@mui/material';
import { useFormik, Form, FormikProvider } from "formik";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as Yup from "yup";
import config from "../../../common/Config";
import { useStyles } from "../Style/macroStyle";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const optionsData = [
    { id: 7, value: 7, label: "Default" },
    { id: 0, value: 0, label: "0" },
    { id: 1, value: 1, label: "1" },
    { id: 2, value: 2, label: "2" },
    { id: 3, value: 3, label: "3" },
    { id: 4, value: 4, label: "4" },
    { id: 5, value: 5, label: "5" },
];

function Macro() {

    // component variables
    const dispatch = useDispatch();
    const matrixState = useSelector(state => state?.Matrix?.matrix);
    matrixState?.sort((item1, item2) => {
        if (item1.name < item2.name) return -1;
        if (item2.name < item1.name) return 1;

        return 0;
    })
    matrixState?.sort((item1, item2) => {
        if (item1.name === "DEFAULT") return -1;
        if (item2.name === "DEFAULT") return 1;

        return 0;
    })
    matrixState?.map((matrix) => {
        return matrix.macro.sort((item1, item2) => {
            if (item1.name > item2.name) return 1;
            if (item2.name > item1.name) return -1;
            return 0;
        })
    })
    matrixState?.map((matrix) => {
        return matrix?.macro?.map((macro) => {
            return macro.macroZone.sort((macroZone1, macroZone2) => {
                if (macroZone1.zone.LabelZone > macroZone2.zone.LabelZone) return 1;
                if (macroZone2.zone.LabelZone > macroZone1.zone.LabelZone) return -1;
                return 0;
            })
        })
    })
    const [deletedStandard, setdeletedStandard] = useState();
    const classes = useStyles();
    const [stateSnackBar, setStateSnackBar] = useState({
        openSnackBar: false,
        vertical: "bottom",
        horizontal: "left",
        severity: "success",
        duration: 3000,
        message: "",
    });

    const { openSnackBar, vertical, horizontal, severity, duration, message } = stateSnackBar;

    // function responsible for making an api request to get a non_active matrix to fill in
    async function fetchData() {
        try {
            const response = await fetch(config.url + '/matrix/non_active', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }


    const [addOpen, setAddOpen] = useState(false);

    // function responsible for requestion the addition to the new matrix from the backend
    const handleAddOpen = async () => {
        try {
            const data = await fetchData();
            formik.setValues({
                id: data.id,
                standardName: '',
                macro1Name: {
                    id: data.macro[0].id,
                    Adress: data.macro[0].Adress,
                    name: '',
                },
                macro2Name: {
                    id: data.macro[1].id,
                    Adress: data.macro[1].Adress,
                    name: '',
                },
                macroZone1: data.macro[0].macroZone.map((macroZone) => ({ id: macroZone.id, zone: macroZone.zone, Adress: macroZone.Adress, value: 7 })),
                macroZone2: data.macro[1].macroZone.map((macroZone) => ({ id: macroZone.id, zone: macroZone.zone, Adress: macroZone.Adress, value: 7 })),
                action: 'add',
            });
            setAddOpen(true);
        } catch (error) {
            console.error(error);
        }
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const [modifyOpen, setModifyOpen] = useState(false);



    // function responsible for requestion the update to the new matrix from the backend
    const handleModifyOpen = (standard) => {
        formik.setValues(
            {
                id: standard.id,
                standardName: standard.name,
                macro1Name: {
                    id: standard.macro[0].id,
                    Adress: standard.macro[0].Adress,
                    name: standard.macro[0].name
                },
                macro2Name: {
                    id: standard.macro[1].id,
                    Adress: standard.macro[1].Adress,
                    name: standard.macro[1].name
                },
                macroZone1: standard.macro[0].macroZone.map((macroZone) => ({ id: macroZone.id, zone: macroZone.zone, Adress: macroZone.Adress, value: macroZone.value })),
                macroZone2: standard.macro[1].macroZone.map((macroZone) => ({ id: macroZone.id, zone: macroZone.zone, Adress: macroZone.Adress, value: macroZone.value })),
                action: "update"
            }
        )
        setModifyOpen(true);
    };

    const handleModifyClose = () => {
        setModifyOpen(false);
    };


    const [deleteOpen, setDeleteOpen] = useState(false);

    const handledeleteOpen = (confirmationOpened, standard) => {
        setdeletedStandard(standard);
        setDeleteOpen(confirmationOpened)
    }


    // function responsible for requestion the deletion to the selected matrix from the backend
    const deleteStandard = () => {
        let payload = {
            id: deletedStandard.id,
            active: false
        }
        const request = {
            payload,
            successCallBack: (response) => {
                setStateSnackBar({
                    ...stateSnackBar,
                    severity: "success",
                    message: "la standard a été supprimer",
                    openSnackBar: true,
                });
            },
            failCallBack: (error) => {
                setStateSnackBar({
                    ...stateSnackBar,
                    severity: "error",
                    message: error.response?.data?.message || error.message,
                    openSnackBar: true,
                });
            },
        };
        dispatch(matrixActions.matrixDeleteStart(request));
        handledeleteOpen(false, null)
    }

    // loading zones and updating it through web socket response
    useEffect(() => {

        const request = {
            successCallBack: (response) => {
            },
            failCallBack: (error) => {
                setStateSnackBar({
                    ...stateSnackBar,
                    severity: "error",
                    message: error.response?.data?.message || error.message,
                    openSnackBar: true,
                });
            },
        };
        dispatch(matrixActions.matrixStart(request))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])


    // error pop up closing function
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
    };

    const formik = useFormik({
        initialValues: {
            id: "",
            standardName: "",
            macro1Name: {
                id: "",
                name: ""
            },
            macro2Name: {
                id: "",
                name: ""
            },
            macroZone1: [],
            macroZone2: [],
            action: ""
        }
        ,
        validationSchema: Yup.object().shape({
            standardName: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const request = {
                payload: {
                    id: values.id,
                    name: values.standardName,
                    macro: [
                        {
                            id: values.macro1Name.id,
                            name: values.macro1Name.name,
                            macroZone: values.macroZone1,
                            Adress: values.macro1Name.Adress,
                            active: values.standardName === "DEFAULT" ? true : values.macroZone1.some(zone => zone.value !== 7)
                        },
                        {
                            id: values.macro2Name.id,
                            name: values.macro2Name.name,
                            macroZone: values.macroZone2,
                            Adress: values.macro2Name.Adress,
                            active: values.standardName === "DEFAULT" ? true : values.macroZone1.some(zone => zone.value !== 7)
                        }
                    ],
                },
                successCallBack: (response) => {
                    setStateSnackBar({
                        ...stateSnackBar,
                        severity: "success",
                        message: "Record saved successfully",
                        openSnackBar: true,
                    });
                },
                failCallBack: (error) => {
                    setStateSnackBar({
                        ...stateSnackBar,
                        severity: "error",
                        message: error.response.data.message,
                        openSnackBar: true,
                    });
                },
            }
            if (values.action === "add") dispatch(matrixActions.matrixAddStart(request));
            else if (values.action === "update") dispatch(matrixActions.matrixUpdateStart(request));
            setAddOpen(false);
            setModifyOpen(false);
        }
    });
    const { handleSubmit, handleChange, values } = formik;

    const setValues = (newValues) => {
        formik.setValues(newValues);
    };
    return (
        <Box className={classes.backGround}>
            <Box className={classes.standards}>
                {
                    matrixState?.map((standard, id) => {
                        return <Box className={classes.standard} key={id}>
                            <Box className={classes.title}>{standard.name}</Box>
                            <Box className={classes.container}>
                                <Box className={classes.macros}>
                                    {
                                        standard?.macro[0]?.active ?
                                            <Box className={classes.macro}>
                                                <Box className={classes.macroTitle}>{standard?.macro[0]?.name}</Box>
                                                <Box>
                                                    <Box className={classes.zone}>
                                                        <Box className={classes.fonction}>FONCTION</Box>
                                                        <Box className={classes.brillance}>BRILLANCE</Box>
                                                    </Box>
                                                    {
                                                        standard?.macro[0]?.macroZone.map((macroZone, id) => {
                                                            return <Box className={classes.zone} key={id}>
                                                                <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                                <Box className={classes.brillance}>{macroZone?.value === 7 ? "Default" : macroZone?.value}</Box>
                                                            </Box>
                                                        })
                                                    }
                                                </Box>
                                            </Box>
                                            : null
                                    }
                                    {
                                        standard?.macro[1]?.active ?
                                            <Box className={classes.macro}>
                                                <Box className={classes.macroTitle}>{standard?.macro[1]?.name}</Box>
                                                <Box>
                                                    <Box className={classes.zone}>
                                                        <Box className={classes.fonction}>FONCTION</Box>
                                                        <Box className={classes.brillance}>BRILLANCE</Box>
                                                    </Box>
                                                    {
                                                        standard?.macro[1]?.macroZone.map((macroZone, id) => {
                                                            return <Box className={classes.zone} key={id}>
                                                                <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                                <Box className={classes.brillance}>{macroZone?.value === 7 ? "Default" : macroZone?.value}</Box>
                                                            </Box>
                                                        })
                                                    }
                                                </Box>
                                            </Box>
                                            : null
                                    }
                                </Box>
                                <Dialog open={modifyOpen} onClose={handleModifyClose}>
                                    <FormikProvider value={formik}>
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
                                            <Box className={classes.standardForm}>
                                                <Box className={classes.title}>
                                                    <TextField
                                                        autoFocus
                                                        id="standardName"
                                                        type="text"
                                                        onChange={handleChange}
                                                        defaultValue={values.standardName}
                                                        inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "30px" } }}
                                                        fullWidth
                                                        variant="filled"
                                                        disabled={values.standardName === "DEFAULT"}
                                                    />
                                                </Box>
                                                <Box className={classes.container}>
                                                    <Box className={classes.macros}>
                                                        <Box className={classes.macro}>
                                                            <Box className={classes.macroTitle}>
                                                                <TextField
                                                                    autoFocus
                                                                    id="macro1Name.name"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    defaultValue={values.macro1Name.name}
                                                                    inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "20px" } }}
                                                                    fullWidth
                                                                    variant="filled"
                                                                    disabled={values.standardName === "DEFAULT"}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <Box className={classes.zone}>
                                                                    <Box className={classes.fonction}>FONCTION</Box>
                                                                    <Box className={classes.brillance}>BRILLANCE</Box>
                                                                </Box>
                                                                {
                                                                    values.macroZone1.map((macroZone, id) => {
                                                                        return <Box className={classes.zone} key={id}>
                                                                            <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                                            <Box className={classes.brillance}>
                                                                                <select
                                                                                    name={`macroZone1[${id}].value`}
                                                                                    value={values.macroZone1[id]?.value}
                                                                                    onChange={(e) => {
                                                                                        const selectedValue = e.target.value;
                                                                                        setValues((prevValues) => ({
                                                                                            ...prevValues,
                                                                                            macroZone1: [
                                                                                                ...prevValues.macroZone1.slice(0, id),
                                                                                                {
                                                                                                    id: macroZone.id,
                                                                                                    zone: macroZone.zone,
                                                                                                    Adress: macroZone.Adress,
                                                                                                    value: parseInt(selectedValue),
                                                                                                },
                                                                                                ...prevValues.macroZone1.slice(id + 1),
                                                                                            ],
                                                                                        }));
                                                                                    }}
                                                                                    style={{ width: "100%" }}
                                                                                >
                                                                                    {optionsData.map((option) => (
                                                                                        <option key={option.id} value={option.id}>
                                                                                            {option.label}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </Box>
                                                                        </Box>
                                                                    })
                                                                }
                                                            </Box>
                                                        </Box>
                                                        <Box className={classes.macro}>
                                                            <Box className={classes.macroTitle}>
                                                                <TextField
                                                                    autoFocus
                                                                    id="macro2Name.name"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    defaultValue={values.macro2Name.name}
                                                                    inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "20px" } }}
                                                                    fullWidth
                                                                    variant="filled"
                                                                    disabled={values.standardName === "DEFAULT"}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <Box className={classes.zone}>
                                                                    <Box className={classes.fonction}>FONCTION</Box>
                                                                    <Box className={classes.brillance}>BRILLANCE</Box>
                                                                </Box>
                                                                {
                                                                    values.macroZone2.map((macroZone, id) => {
                                                                        return <Box className={classes.zone} key={id}>
                                                                            <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                                            <Box className={classes.brillance}>
                                                                                <select
                                                                                    name={`macroZone2[${id}].value`}
                                                                                    value={values.macroZone2[id]?.value}
                                                                                    onChange={(e) => {
                                                                                        const selectedValue = e.target.value;
                                                                                        setValues((prevValues) => ({
                                                                                            ...prevValues,
                                                                                            macroZone2: [
                                                                                                ...prevValues.macroZone2.slice(0, id),
                                                                                                {
                                                                                                    id: macroZone.id,
                                                                                                    zone: macroZone.zone,
                                                                                                    Adress: macroZone.Adress,
                                                                                                    value: parseInt(selectedValue),
                                                                                                },
                                                                                                ...prevValues.macroZone2.slice(id + 1),
                                                                                            ],
                                                                                        }));
                                                                                    }}
                                                                                    style={{ width: "100%" }}
                                                                                >
                                                                                    {optionsData.map((option) => (
                                                                                        <option key={option.id} value={option.value}>
                                                                                            {option.label}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </Box>
                                                                        </Box>
                                                                    })
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <DialogActions className={classes.addButtons}>
                                                <Button type='submit' className={classes.Button}>Confirmer</Button>
                                                <Button onClick={handleModifyClose} className={classes.Button}>Annuler</Button>
                                            </DialogActions>
                                        </Form>
                                    </FormikProvider>
                                </Dialog>
                                <Button onClick={() => { handleModifyOpen(standard) }} className={classes.Button} variant="contained">Modifier</Button>
                                {standard?.macro[0]?.name === "OFF" ?
                                    null
                                    : <Button onClick={() => { handledeleteOpen(true, standard) }} className={classes.Button} variant="contained">Supprimer</Button>
                                }
                            </Box>
                        </Box>
                    })
                }
            </Box>
            <Box className={classes.buttonBox}>
                <Button onClick={handleAddOpen} className={classes.ButtonAjouter} variant="contained">Ajouter</Button>
            </Box>
            <Dialog open={addOpen} onClose={handleAddClose}>
                <FormikProvider value={formik}>
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Box className={classes.standardForm}>
                            <Box className={classes.title}>
                                <TextField
                                    autoFocus
                                    id="standardName"
                                    type="text"
                                    onChange={handleChange}
                                    defaultValue={values.standardName}
                                    inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "30px" } }}
                                    fullWidth
                                    variant="filled"
                                />
                            </Box>
                            <Box className={classes.container}>
                                <Box className={classes.macros}>
                                    <Box className={classes.macro}>
                                        <Box className={classes.macroTitle}>
                                            <TextField
                                                autoFocus
                                                id="macro1Name.name"
                                                type="text"
                                                onChange={handleChange}
                                                defaultValue={values.macro1Name.name}
                                                inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "20px" } }}
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Box>
                                        <Box>
                                            <Box className={classes.zone}>
                                                <Box className={classes.fonction}>FONCTION</Box>
                                                <Box className={classes.brillance}>BRILLANCE</Box>
                                            </Box>
                                            {
                                                values.macroZone1.map((macroZone, id) => {
                                                    return <Box className={classes.zone} key={id}>
                                                        <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                        <Box className={classes.brillance}>
                                                            <select
                                                                name={`macroZone1[${id}].value`}
                                                                value={values.macroZone1[id]?.value}
                                                                onChange={(e) => {
                                                                    const selectedValue = e.target.value;
                                                                    setValues((prevValues) => ({
                                                                        ...prevValues,
                                                                        macroZone1: [
                                                                            ...prevValues.macroZone1.slice(0, id),
                                                                            {
                                                                                id: macroZone.id,
                                                                                zone: macroZone.zone,
                                                                                Adress: macroZone.Adress,
                                                                                value: parseInt(selectedValue),
                                                                            },
                                                                            ...prevValues.macroZone1.slice(id + 1),
                                                                        ],
                                                                    }));
                                                                }}
                                                                style={{ width: "100%" }}
                                                            >
                                                                {optionsData.map((option) => (
                                                                    <option key={option.id} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </Box>
                                                    </Box>
                                                })
                                            }
                                        </Box>
                                    </Box>
                                    <Box className={classes.macro}>
                                        <Box className={classes.macroTitle}>
                                            <TextField
                                                autoFocus
                                                id="macro2Name.name"
                                                type="text"
                                                onChange={handleChange}
                                                defaultValue={values.macro2Name.name}
                                                inputProps={{ style: { textAlign: 'center', fontFamily: "Baskerville", fontSize: "30px", fontWeight: 600, height: "20px" } }}
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Box>
                                        <Box>
                                            <Box className={classes.zone}>
                                                <Box className={classes.fonction}>FONCTION</Box>
                                                <Box className={classes.brillance}>BRILLANCE</Box>
                                            </Box>
                                            {
                                                values.macroZone2.map((macroZone, id) => {
                                                    return <Box className={classes.zone} key={id}>
                                                        <Box className={classes.fonction}>{macroZone?.zone?.LabelZone}</Box>
                                                        <Box className={classes.brillance}>
                                                            <select
                                                                name={`macroZone2[${id}].value`}
                                                                value={values.macroZone2[id]?.value}
                                                                onChange={(e) => {
                                                                    const selectedValue = e.target.value;
                                                                    setValues((prevValues) => ({
                                                                        ...prevValues,
                                                                        macroZone2: [
                                                                            ...prevValues.macroZone2.slice(0, id),
                                                                            {
                                                                                id: macroZone.id,
                                                                                zone: macroZone.zone,
                                                                                Adress: macroZone.Adress,
                                                                                value: parseInt(selectedValue),
                                                                            },
                                                                            ...prevValues.macroZone2.slice(id + 1),
                                                                        ],
                                                                    }));
                                                                }}
                                                                style={{ width: "100%" }}
                                                            >
                                                                {optionsData.map((option) => (
                                                                    <option key={option.id} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </Box>
                                                    </Box>
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions className={classes.addButtons}>
                            <Button type='submit' className={classes.Button}>Confirmer</Button>
                            <Button onClick={handleAddClose} className={classes.Button}>Annuler</Button>
                        </DialogActions>
                    </Form>
                </FormikProvider>
            </Dialog>

            <Box>
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={{ vertical, horizontal }}
                    autoHideDuration={duration}
                    onClose={handleSnackClose}
                >
                    <Alert severity={severity} onClose={handleSnackClose}>
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
            <Dialog
                open={deleteOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { handledeleteOpen(false) }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Voulez-vous vraiment supprimer  cette standard ?"}</DialogTitle>
                <DialogActions className={classes.confirmationActions}>
                    <Button variant="contained" onClick={() => { deleteStandard(deletedStandard) }}>Oui</Button>
                    <Button variant="contained" onClick={() => { handledeleteOpen(false) }}>Non</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Macro