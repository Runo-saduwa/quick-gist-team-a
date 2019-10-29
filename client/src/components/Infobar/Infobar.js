import React from 'react'
import 'circular-std'
import './Infobar.css'
// import onlineIcon from '../../assets/icons/onlineIcon.png'
import onlineIcon from '../../assets/icons/online-icon.png'
import closeIcon from '../../assets/icons/closeIcon.png'
import { FiX } from 'react-icons/fi'

const Infobar = ({ room }) => {
    return (
        <div className='info-bar shadow-sm'>
            <div className='left-inner-container'>
                <img src={onlineIcon} alt="" className="online-icon" alt='online image' />
                {/* <p className='online-icon'><FiX className='online-icon' size={20} color='#000'/></p> */}
                <h3 style={{ fontFamily: 'CircularStd', fontWeight: 600, color: '#000', marginBottom: 0, marginTop: 0 }} >{room}</h3>
            </div>
            <div className="right-inner-container">
                {/* <a href="/"><img src={closeIcon} alt="close image" /></a> */}
                <a href="/"><FiX size={20} color='#000' /></a>
            </div>
        </div>
        // <div class="card bg-light mb-3" style={{ width: '80%' }}>
        //     <div class="card-header">Header</div>
        //     <div class="card-body">
        //         <h4 class="card-title">Light card title</h4>
        //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     </div>
        // </div>

        // <div>
        //     <div class="container">
        //         <div class="col-sm">One of three columns</div>
        //         <div class="col-sm">
        //         One of three columns
        //             {/* <div className="row text-center mx-auto"> */}
        //             {/* One of three columns */}
        //             {/* </div> */}
        //         </div>
        //         <div class="col-sm"> One of three columns</div>
        //     </div>
        // </div>

        //     <div class="container">
        //         <div class="row">
        //             <div class="col-sm-3">
        //                 One of three columns
        // </div>
        //             <div class="col-sm-6 border my-auto align-self-center" style={{ height: '60px' }}>
        //                 <div>
        //                     <p>Gnosis</p>

        //                     <img src={onlineIcon} alt="" className="online-icon pull-right my-auto" alt='online image' />
        //                 </div>
        //             </div>
        //             <div class="col-sm-3">
        //                 One of three columns
        // </div>
        //         </div>
        //     </div>
    )
}

export default Infobar
