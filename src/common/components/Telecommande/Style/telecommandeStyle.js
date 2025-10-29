import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles({
	card: {
		margin: "0.5px",
		direction: "ltr",
		unicodeBidi: "isolate",
		position: "relative",
		minWidth: '99px',
		maxWidth: "99px",
		Height: '150',
		backgroundColor: '#D9D9D9',
		textAlign: "center",
		borderRadius: '10px !important'
	},
	CardContentManual: {
		backgroundColor: '#EBB236',
		padding: '4px !important',
		borderRadius: 10,
		fontSize: '12px',
		color: 'white',
		cursor:"pointer",
		display: 'flex',
		justifyContent: 'space-around'
	},
	CardContentOn: {
		backgroundColor: '#41D800',
		padding: '4px !important',
		borderRadius: 10,
		fontSize: '12px',
		color: 'white',
		cursor:"pointer",
		display: 'flex',
		justifyContent: 'space-around'
	},
	CardContentOff: {
		backgroundColor: '#404F78',
		padding: '4px !important',
		borderRadius: 10,
		fontSize: '12px',
		color: 'white',
		cursor:"pointer",
		display: 'flex',
		justifyContent: 'space-around'
	},
	CardContentError: {
		backgroundColor: '#FF0000',
		padding: '4px !important',
		borderRadius: 10,
		fontSize: '12px',
		color: 'white',
		cursor:"pointer",
		display: 'flex',
		justifyContent: 'space-around'
	},
	levelDropDown: {
		padding: '0px 5px 0px 5px',
		borderRadius: '50%',
		textAlign: 'center',
		backgroundColor: '#000d20',
	},
	levelDropDownError: {
		padding: '0px 7px 0px 7px',
		borderRadius: '50%',
		textAlign: 'center',
		backgroundColor: '#ff0000',
		color: 'white',
	},
	luminosityActions: {
		position: "relative",
		justifyContent: "space-around"
	},
	luminosityControl: {
		height: "40px",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center"
	},
	Button: {
		"&.MuiButton-contained": {
			backgroundColor: '#404F78',
			minWidth: '30px',
			padding: '2.5px',
			marginLeft: '0px !important'
		},
		"&:disabled": {
			backgroundColor: '#BBB'
		}
	},
	SwitchOffButtonAut: {
		"&.MuiButton-contained": {
			backgroundColor: '#404F78',
			minWidth: '40px',
			padding: '2px',
			fontSize: "12px",
			borderRadius: 22 / 2
		},"&:disabled": {
			backgroundColor: 'red',
			color: "white"
		}
	},
	SwitchOnButtonAut: {
		"&.MuiButton-contained": {
			backgroundColor: '#404F78',
			minWidth: '40px',
			padding: '2px',
			fontSize: "12px",
			borderRadius: 22 / 2
		},"&:disabled": {
			backgroundColor: '#41D800',
			color: "white"
		}
	},
	SwitchOffButton: {
		"&.MuiButton-contained": {
			backgroundColor: 'red',
			minWidth: '40px',
			padding: '2px',
			fontSize: "12px",
			borderRadius: 22 / 2
		},"&:disabled": {
			backgroundColor: '#BBB'
		}
	},
	SwitchOnButton: {
		"&.MuiButton-contained": {
			backgroundColor: '#41D800',
			minWidth: '40px',
			padding: '2px',
			fontSize: "12px",
			borderRadius: 22 / 2
		},"&:disabled": {
			backgroundColor: '#BBB'
		}
	},
	luminosity: {
		position: "absolute",
	},
	switchCard: {
		justifyContent: "center",
		paddingTop: 5,
		margin: '0 !important'
	},
	Typography: {
		fontSize: "0.9rem !important",
		margin: '4px !important'
	},
});