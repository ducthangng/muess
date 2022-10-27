const Checkbox = ({ label }) => {
    return (
      <div className="checkbox-wrapper" style={{display:'flex',}}>
          <input type="checkbox" 
            style={{
                display:'flex',
                width:'1.25rem',
                height:'1.25rem',
                margin:'0.5rem',
            }} />
          <span 
            style={{
                display:'flex',
                margin:'0.5rem',
                fontWeight:'bold',
                fontSize:'1rem',
            }}>{label}</span>
      </div>
    );
  };
  export default Checkbox;