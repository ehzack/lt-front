import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
	regulateur: {
		fontSize: '14px',
		position: "relative",
		minWidth: '240px',
		maxWidth: '250px',
		minHeight: '240px',
		maxHeight: '240px',
		margin: 2,
		backgroundColor: '#D9D9D9',
		textAlign: "center",
		borderRadius: '10px !important',
	},
	CardContentOn: {
		backgroundColor: '#41D800',
		padding: '7px !important',
		borderRadius: 10,
		fontSize: '14px',
		color: 'white',
		display: 'flex',
	},
	CardContentOff: {
		backgroundColor: '#404F78',
		padding: '7px !important',
		borderRadius: 10,
		fontSize: '14px',
		color: 'white',
		display: "flex"
	},
	CardContentError: {
		backgroundColor: '#ff0000',
		padding: '7px !important',
		borderRadius: 10,
		fontSize: '14px',
		color: 'white',
		display: 'flex',
	},
	CardContentManual: {
		backgroundColor: '#EBB236',
		padding: '7px !important',
		borderRadius: 10,
		fontSize: '14px',
		color: 'white',
		display: 'flex',
	},
	allDefauts: {
		'&::-webkit-scrollbar': {
			width: '0.4em',
			backgroundColor: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'transparent'
		},

		minHeight: '150px',
		maxHeight: '170px',

		overflowY: 'auto',
		overflowX: 'hidden',

	},
	time: {
		backgroundColor: '#000d20',
		color: 'white',
		borderRadius: 5,
		position: 'absolute',
		bottom: '5px',
		right: '55px',
		left: '55px'
	},
	communiquantButton: {
		color: "white",
		padding: "0px 10px 0 10px !important",
		fontSize: "20px",
		lineHeight: 1,
		fontWeight: 600,
		display: "flex",
		justifyContent: "center"
	},
	label: {
		display: "flex",
		justifyContent: "center",
		width: "50%"
	},
	communiquantB: {
		display: "flex",
		width: "50%",
		justifyContent: "flex-end"
	},
	communiquant: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "space-around",
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 750,
		height: 525,
		backgroundColor: '#DEDEDE',
		borderRadius: 5,
	},
	header: {
		height: "30%",
		width: "90%",
		display: "grid",
		alignSelf: "center",
		alignContent: "center",
		gridTemplateColumns: "repeat(3,minmax(0, 1fr))",
	},
	Reg: {
		justifyContent: "flex-start",
	},
	regulateurName: {
		display: "flex",
		justifyContent: "center",
		alignSelf: "center",
		fontSize: 30
	},
	extraData: {
		display: "flex",
		justifyContent: "space-evenly",
		borderRadius: 5,
		width: "100%",
		height: 350
	},
	extraDataStates: {
		display: "flex",
		backgroundColor: 'white',
		borderRadius: 5,
		width: 480,
		height: 320
	},
	Analogs: {
		width: "90%",
		height: "65%",
		display: "flex",
		flexWrap: "wrap",
		alignContent: "center",
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: 5,
	},
	AnalogTitle: {
		display: 'flex',
		justifyContent: "center",
		fontWeight: 500
	},
	Analog: {
		display: 'flex',
		justifyContent: 'space-between',
		width: "90%",
	},
	Text: {
		display: 'flex',
		width: "50%",
		color: "black",
	},
	Values: {
		display: 'flex',
		width: "35%",
		justifyContent: "center",
		backgroundColor: "#00183b",
		color: "white",
		borderRadius: 50,
	},
	ValuesRED: {
		display: 'flex',
		width: "35%",
		justifyContent: "center",
		backgroundColor: "red",
		color: "white",
		borderRadius: 50,
	},
	CCRStates: {
		width: "40%",
		height: "40%",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignContent: "stretch",
		borderRadius: 5,
	},
	CCRStatesTitle: {
		display: 'flex',
		justifyContent: "center",
		fontWeight: 500
	},
	EquipOn: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#00FF01",
		color: "white",
		borderRadius: 50
	},
	EquipOff: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "red",
		color: "white",
		borderRadius: 50
	},
	LocalOn: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#FEDD2E",
		color: "Black",
		fontWeight: 500,
		borderRadius: 50
	},
	LocalOff: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#C0CED1",
		color: "Black",
		fontWeight: 500,
		borderRadius: 50
	},
	RemoteOn: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#00FF01",
		color: "black",
		fontWeight: 500,
		borderRadius: 50
	},
	RemoteOff: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#C0CED1",
		color: "black",
		fontWeight: 500,
		borderRadius: 50
	},
	extraDataFaults: {
		display: "flex",
		flexWrap: "wrap",
		alignContent: "stretch",
		justifyContent: "center",
		backgroundColor: 'white',
		borderRadius: 5,
		width: 220,
		height: 320
	},
	CCRFaults: {
		display: 'flex',
		justifyContent: "center",
		fontWeight: 500
	},
	faultsOff: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#00183b",
		color: "white",
		borderRadius: 50
	},
	faultsOn: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "red",
		color: "white",
		borderRadius: 50
	},
	comm: {
		display: 'flex',
		justifyContent: "space-evenly",
		width: "90%",
		color: "white",
		height: 25,
	},
	commIPOn: {
		display: 'flex',
		alignContent: "center",
		justifyContent: "center",
		width: "50%",
		borderRadius: 50,
		backgroundColor: "#00FF01",
	},
	commIPOff: {
		display: 'flex',
		alignContent: "center",
		justifyContent: "center",
		width: "50%",
		borderRadius: 50,
		backgroundColor: "red",
	},
	commBlank: {
		display: 'flex',
		alignContent: "center",
		justifyContent: "center",
		width: "50%",
		borderRadius: 50,
		backgroundColor: "#00183b",
	},
	alimentaionBlank: {
		display: 'flex',
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		width: "90%",
		height: 25,
		backgroundColor: "#00183b",
		borderRadius: 50
	},
	flt: {
		display: 'flex',
		justifyContent: "space-evenly",
		width: "90%",
		height: 25,
		fontWeight: 500
	},
	fltLVLOff: {
		display: 'flex',
		alignContent: "center",
		justifyContent: "center",
		width: "25%",
		borderRadius: 50,
		backgroundColor: "#00183b",
		color: "white",
	},
	fltLVLOn: {
		display: 'flex',
		alignContent: "center",
		justifyContent: "center",
		width: "25%",
		borderRadius: 50,
		backgroundColor: "red",
		color: "white",
	}
});
