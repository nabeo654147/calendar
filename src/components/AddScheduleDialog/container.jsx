import AddScheduleDialog from "./presentation";
import { connect } from 'react-redux';
import { 
    addScheduleCloseDialog,
    addScheduleSetValue,
    addScheduleStartEdit
} from "../../redux/addSchedule/actions";
import { asyncSchedulesAddItem } from "../../redux/schedules/effects";
import { isColseDialog } from "../../services/schedule";

const mapStateToProps = state => ({ schedule: state.addSchedule });

const mapDispatchToProps = dispatch => ({
    setSchedule: value => {
        dispatch(addScheduleSetValue(value));
    },
    closeDialog: () => {
        dispatch(addScheduleCloseDialog());
    },
    saveSchedule: schedule => {
        dispatch(asyncSchedulesAddItem(schedule));
        dispatch(addScheduleCloseDialog());
    },
    setIsEditStart: () => {
        dispatch(addScheduleStartEdit());
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    const {
        schedule: { form: schedule }
    } = stateProps;
    const  { saveSchedule, closeDialog } = dispatchProps;

    return {
    ...stateProps,
    ...dispatchProps,
    saveSchedule: () => {
        saveSchedule(schedule);
    },
    closeDialog: () => {
        if (isColseDialog(schedule)) {
            closeDialog();
        }
      }
    }
};

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(AddScheduleDialog);