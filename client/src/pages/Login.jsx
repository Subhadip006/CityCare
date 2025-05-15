import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();





  const handleSubmit = async (e) => {
    e.preventDefault();

    seterror('');
    setsuccess('');

    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email : email,
          password: password,
        }),
      });

      const data = await res.json();
      if(res.status === 200){
        localStorage.setItem('token', data.token);
        setsuccess(data.message);
        setemail('');
        setpassword('');
        setTimeout(() => navigate('/dashboard'), 3000);
       }else{
        seterror(data.error);
       }
    }catch(err){
      seterror(data.error)
    }
  };

  
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F9F7F3] text-[#cfb961] font-bold font-sans'>
        <div className='w-[90%] md:w-[50%] lg:w-[30%] bg-white p-8 rounded-lg shadow-lg'>
            <h1 className='text-3xl text-center font-extrabold mb-4'>Login</h1>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            {success && <div className="text-green-500 mb-4 text-center">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-md font-medium mb-2'>Email</label>
                    <input 
                    type='email' 
                    id='email' 
                    className='w-full border-2 border-gray-300 rounded-md p-2' 
                    required 
                    value = {email}
                    onChange={(e) =>setemail(e.target.value)} 
                     />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-md font-medium mb-2'>Password</label>
                    <input 
                    type='password' 
                    id='password' 
                    className='w-full border-2 border-gray-300 rounded-md p-2' 
                    required
                    value = {password}
                    onChange={(e) =>setpassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='w-full bg-[#F7A072] text-white py-2 rounded-md hover:bg-[#63493b]'>Login</button>
            </form>
        <div className='mt-4 text-center'>
            <p className='text-sm'>Don't have an account?
              <Link to={'/register'} className='text-[#F7A072] pl-1 hover:underline'> Register</Link>
            </p>
        </div>

    </div>
    </div>
  )
}

export default Login