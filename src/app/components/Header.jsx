const Header = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDay = ["Sunday","Monday","TuesDay", "Wednesday","Thursday","Friday", "Saturday"]
    const d = new Date();
    return (
        <>
            <div className="header">
                <div className="date-grid">
                    <div>{d.getDate()}</div>
                    <div>{month[d.getMonth()]}</div>
                    <div>{d.getFullYear()}</div>
                </div>
                <div>{weekDay[d.getDay()]}</div>
            </div>
        </>
    );
}

export default Header;