import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const ProfileTop = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { user } = userInfo
  return (
    <div className='profile-top bg-primary p-2'>
      <div className='row'>
        <div className='col-sm-2 col-md-8'>
          <img className='round-img my-1' src={'./soumya.jpeg'} alt='' />
        </div>
        <div className='col-sm-4 col-md-4'>
          <p style={{ paddingTop: '80px' }} className='lead'>
            {user.name}
          </p>
          <p className='lead'>{user.branch}</p>
          <p>{user.admission}</p>
          <p>{user.email}</p>
          <Link to='/profie/edit' className='btn btn-dark'>
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ProfileTop
