
import Home from './/components/Home';
import {Routes, Route, Link} from 'react-router-dom';
import Encode from './/components/Encode';
import Decode from './/components/Decode';
import About from './/components/About';
import './/components/styles.css';

import "./index.css";

const App=()=>{return <div className="App">
	
<div className="title-wrap">
<h1 className='h1'>
<div className="header">
   TACTICAL FACADE TOOL</div>
	</h1>
</div>
	<div className="body">
	   <ul className='button-wrap'>


			<li><Link to="/encode"><button className='btn-2'>Encode</button></Link></li>
	
		<li><Link to="/decode"><button className='btn-3'>Decode</button></Link></li>
		<li><Link to="/about"><button className='btn-1'>Home</button></Link></li>
		</ul>

		 <div>
	  
<Routes>

<Route path="/home" element={<Home />} />
<Route path="/encode" element={<Encode />}/>
<Route path="/decode" element={<Decode />}/>
<Route path="/about" element={<About />}/>
</Routes> 

	</div>
   </div>
	
	</div>


}

export default App;