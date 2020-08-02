import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [weekStartsOn, setWeekStartsOn] = useState(pickerProps.weekStartsOn || undefined)

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format, weekStartsOn: Number(weekStartsOn)})
	}

	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3>Props Selector</h3>
					<label>Format ( Optional )</label>
					<input placeholder="Default : do MMMM yyyy" value={format} 
						onChange={e => setFormat(e.target.value)} />

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