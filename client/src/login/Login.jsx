import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const {
    register,
    handleSubmit,
    //   watch,and i have proble 
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    // e.preventDefault(); 
    const userInfo = {
      email: data.email.toLowerCase(),
      password: data.password
      // confirmPassword:data.confirmPassword,
    }
    await axios.post("http://localhost:3000/user/login", userInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          //   alert("login successfully")
          toast.success(' Login Successfully!');   //extra librebry use
          navigate('/');
          setTimeout(() => {

            localStorage.setItem('Users', JSON.stringify(res.data.user));
            navigate('/'); // Redirect to home page
            window.location.reload()
          }, 500)
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err)
          // alert("error : " + err.response.data.message)
          toast.error("error : " + err.response.data.message);
          // setTimeout(()=>{},2000);
        }
      })


  }


  return (

  

    <div className='pt-16'>
      <Navbar />
      <div className='flex h-screen items-center justify-center'>
      <div className="modal-box bg-slate-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="font-bold text-lg">Login</h3>
            <br />
            <br />
            <span className="py-10 mb-10">Email :</span>
            <br />
            <input
              className='outline-none p-1 bg-slate-300'
              type="email"
              placeholder='example@gmail.com'
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && <span className='text-red-500'>This field is required</span>}
            <br />
            <br />
            <span>Password :</span>
            <br />
            <input
              className='outline-none p-1 bg-slate-300'
              type="password"
              placeholder='********'
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && <span className='text-red-500'>This field is required</span>}
            <br />
            <button className="btn btn-sm bg-pink-600 border-none mt-2">Login</button>
            <br />
            <br />
            <br />
            <p className='text-slate-500'>
              If you are not registered?
              <br />
              <Link to="/Signup">
                <span className="btn btn-sm bg-pink-600 border-none mt-2">Signup</span>
              </Link>
            </p>
          </div>
        </form>
      </div>

      </div>
    </div>
  )
}
