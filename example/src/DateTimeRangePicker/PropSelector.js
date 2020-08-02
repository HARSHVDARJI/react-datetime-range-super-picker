import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [timeFormat, setTimeFormat] = useState(pickerProps.timeFormat || undefined)
	const [dateFormat, setDateFormat] = useState(pickerProps.dateFormat || undefined)
	const [weekStartsOn, setWeekStartsOn] = useState(pickerProps.weekStartsOn || undefined)

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format, timeFormat, dateFormat, weekStartsOn: Number(weekStartsOn)})
	}

	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3>Props Selector</h3>
					<label>Format ( Optional )</label>
					<input placeholder="Default : dd/MM/YYY hh:mm aaa" value={format} 
						onChange={e => setFormat(e.target.value)} />

					<label>Time Format ( Optional )</label>
					<input placeholder="Default : hh:mm aaa" value={timeFormat} 
						onChange={e => setTimeFormat(e.target.value)} />

					<label>Date Format ( Optional )</label>
					<input placeholder="Default : dd/MM/YYY" value={dateFormat} 
						onChange={e => setDateFormat(e.target.value)} />

					<label>Week Starts On ( Optional )</label>
					<input placeholder="Default : 0, Values - [0-6]" value={weekStartsOn} 
						onChange={e => setWeekStartsOn(e.target.value)} />
				</div>
			</div>
			<div className='submit-btn-wrapper'>
				<button className="btn waves-effect waves-light" onClick={handleSubmit} >
					Update Props
					<i className="material-icons right">send</i>
				</button>
			</div>
		</div>
	)
}