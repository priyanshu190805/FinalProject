import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = ({darkMode}) => {

  const {captain} = useContext(CaptainDataContext)

  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img className="h-10 w-10 object-cover rounded-full" src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg" alt="" />
            <h4 className="text-[20px] font-medium capitalize">{captain.fullname.firstname + ' ' + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h5 className="text-[21px] font-semibold">&#8377;295.02</h5>
            <p className={`${darkMode ? "text-[#757575]" : "text-gray-600"}`}>Earned</p>
          </div>
        </div>
        <div className={`flex p-3 ${darkMode ? "bg-[#242424]" : "bg-[#eee]"} rounded-lg justify-center gap-5 items-start mt-6`}>
          <div className="text-center">
            <i className="text-3xl mb-2 ri-timer-2-line"></i>
            <h5 className="text-[19px] font-medium">10.2</h5>
            <p className={`${darkMode ? "text-[#757575]" : "text-gray-600"}`}>Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 ri-speed-up-line"></i>
            <h5 className="text-[19px] font-medium">10.2</h5>
            <p className={`${darkMode ? "text-[#757575]" : "text-gray-600"}`}>Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 ri-booklet-line "></i>
            <h5 className="text-[19px] font-semibold">10.2</h5>
            <p className={`${darkMode ? "text-[#757575]" : "text-gray-600"}`}>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
