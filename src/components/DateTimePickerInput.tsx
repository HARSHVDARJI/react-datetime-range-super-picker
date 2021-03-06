import React, { useState, useEffect, useRef, useCallback } from 'react';

import DateTimePicker from './DateTimePicker'

import { getInitialDateForInput } from '../utils/datetimepicker.utils';
import { DateTimePickerInputProps, DateTimePickerOutPut } from "../interfaces/datetimepicker.interfaces";

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from '../styles/date_time_picker.css'
import rootstyles from "../styles/root.css";


const DateTimePickerInput = (props:DateTimePickerInputProps) => {

	const { colors, closeButtonText } = props

	const wrapperRef = useRef(null);
	const [show_picker, setShow] = useState(false)
	const [show_date, setDate] = useState(
		getInitialDateForInput(props.date, props.format)
	)

	// update state if direct prop update
	useEffect(() => {
		setDate(
			getInitialDateForInput(props.date, props.format)
		)
	}, [props.date, props.format])

	const handleDateUpdate = (date_obj:DateTimePickerOutPut) => {
		props.onDateTimeUpdate(date_obj)
		setDate(date_obj.formatted)
	}

	const handleShow = useCallback(() => {
		setShow(true)
	},[])

	const handleComplete = useCallback(() => {
		setShow(false)
		if(props.onDone) props.onDone()
	}, [])

	useOutsideAlerter(wrapperRef, setShow);

	const inputComponentProps = {
		value: show_date,
		placeholder: 'Click to select date time',
		readOnly: true,
		disabled: props.isDisabled,
		onFocus: handleShow
	}

	const inputComponent = React.isValidElement(props.inputComponent) ?
		React.cloneElement(props.inputComponent, inputComponentProps)
		:
		<input className={styles.picker_input} style={{...props.inputStyle}} {...inputComponentProps} />


	return (
		<div ref={wrapperRef} className={[styles.picker_input_wrapper, props.className].join(' ')} >
			
			{inputComponent}

			{(show_picker && !props.isDisabled) &&
				<div className={[rootstyles.picker_model, props.popupClassName].join(' ')}
					style={{ ...props.popupStyle }} >
					
					<div className={rootstyles.picker_model_inside} >
						<div className={styles.picker_header_wrapper}>
							<div className={styles.picker_header_btn}
								style={{ color: colors.primary_highlight_color }}
								onClick={handleComplete} >
								{closeButtonText}
							</div>
						</div>

						<DateTimePicker date={props.date} colors={colors}
							format={props.format} timeFormat={props.timeFormat} dateFormat={props.dateFormat}
							weekStartsOn={props.weekStartsOn} 
							onDateUpdate={props.onDateUpdate} 
							onTimeUpdate={props.onTimeUpdate}
							onDateTimeUpdate={handleDateUpdate}
						/>
					</div>

				</div>
			}
		</div>
	)
}

DateTimePickerInput.defaultProps = {
	closeButtonText: 'Done',
	isDisabled: false
}

export default DateTimePickerInput