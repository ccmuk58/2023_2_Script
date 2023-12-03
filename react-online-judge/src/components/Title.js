const Title = () => {

	return (
		<>
			<div className="content-item">
				<h1 className="header">ROJ TITLE</h1>
				{/* justifyContent:"space-evenly" 혹은 "center" */}
				<div style={{display:"flex", justifyContent:"space-evenly"}}>
					<p>이런식으로 하면&nbsp;</p>
					<p>옆으로 쓸 수 있음</p>
				</div>
			</div>
		</>
	)
}
export default Title;