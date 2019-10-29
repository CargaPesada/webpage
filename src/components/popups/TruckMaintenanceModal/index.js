/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		display: 'flex',
		flexDirection: 'column'
	},
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		}
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

export default function TruckMaintenanceModal(props) {
	const classes = useStyles();
	const [ users, setUsers ] = React.useState([]);
	const [ trucks, setTrucks ] = React.useState([]);
	const [ selectedTruck, setSelectedTruck ] = React.useState('');
	const [ selectedMechanical, setSelectedMechanical ] = React.useState('');

	const handleTruckChange = (event) => {
		setSelectedTruck(event.target.value);
	};

	const handleMechanicalChange = (event) => {
		setSelectedMechanical(event.target.value);
	};

	const handleClose = () => {
		props.closePopup();
	};

	const fetchUsers = async () => {
		let availableUsers = await new FirebaseHandler().getAllUsers();
		let usersList = [];

		for (let index in availableUsers) {
			if (availableUsers[index].cargo === 'mecanico') {
				usersList.push(availableUsers[index]);
			}
		}

		setUsers(usersList);
	};

	const fetchTrucks = async () => {
		let availableTrucks = await new FirebaseHandler().getAllTrucks();
		let trucksList = [];

		for (let index in availableTrucks) {
			trucksList.push(availableTrucks[index]);
		}

		console.log(trucksList);
		setTrucks(trucksList);
	};

	if (users.length === 0) {
		fetchUsers();
	}

	if (trucks.length === 0) {
		fetchTrucks();
	}

	return (
		<div>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				className={classes.modal}
				open={props.isOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={props.isOpen}>
					<div className={classes.paper}>
						<h2 id="spring-modal-title">Cadastro de manutenção</h2>
						<InputLabel shrink id="demo-simple-select-placeholder-label-label">
							Título
						</InputLabel>
						<input type="text" />
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="demo-simple-select-placeholder-label-label">
								Mecânico
							</InputLabel>
							<Select
								labelId="demo-simple-select-placeholder-label-label"
								id="demo-simple-select-placeholder-label"
								onChange={handleMechanicalChange}
								value={selectedMechanical}
								displayEmpty
								className={classes.selectEmpty}
							>
								{users.map((user) => {
									return <MenuItem value={user.nome}>{user.nome}</MenuItem>;
								})}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="demo-simple-select-placeholder-label-label">
								Placa do caminhão
							</InputLabel>
							<Select
								labelId="demo-simple-select-placeholder-label-label"
								id="demo-simple-select-placeholder-label"
								onChange={handleTruckChange}
								value={selectedTruck}
								displayEmpty
								className={classes.selectEmpty}
							>
								{trucks.map((truck) => {
									return <MenuItem value={truck.placa}>{truck.placa}</MenuItem>;
								})}
							</Select>
						</FormControl>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
