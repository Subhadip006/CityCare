import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useNavigate } from 'react-router-dom';

function Complaints() {
  const [Title, setTitle] = useState('');
  const [departmnet, setdepartmnet] = useState("");
  const [description, setdescription] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("")
  const navigate = useNavigate();

  const formdata = new FormData();
  formdata.append('Title', Title);
  formdata.append('Department', departmnet);
  formdata.append('Description', description);


  useEffect(() =>{
    const token = localStorage.getItem("token")

    console.log(token);

    if(!token){
          seterror("Invalid Token");
          setTimeout(() => {

            navigate('/login')
          }, 1000);
          
    }
  },[])


  const handleSubmit = async (e) => {

      e.preventDefault();
      const token = localStorage.getItem("token")

      try{
        const response = await fetch('http://localhost:8080/complaint', {
          method : 'POST',
          headers : {
            'Authorization' : `Bearer ${token}`
          },

          body : formdata,
        });

        if(response.ok){
          const data = await response.json();

          setsuccess(data.message)

          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }else{
          const data = await response.json();
          seterror(data.error);
        }

      }catch(error){
        seterror(error)
      }
  }


  return (
    <>
    <div className='flex flex-col min-h-screen bg-[#F9F7F3]'>
      <Navbar />
      <div className='text-center text-2xl text-[#cfb961] font-bold'>
        Raise A Complaint
      </div>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {success && <div className="text-green-500 mb-4 text-center">{success}</div>}

      <form onSubmit={handleSubmit} className= "grid grid-cols-3 gap-y-6 w-full px-8 mt-8">
          <div className='col-span-2 flex flex-col ml-8 gap-y-2'>
            <label htmlFor="title" className='text-xl font-sans text-[#cfb961] font-semibold '>Title</label>
            <input 
            className='border-2 rounded-2xl p-2 text-[#754023] font-mono border-[#cfb961]'
            placeholder='Enter Title'
            type="text"
            value = {Title}
            onChange={(e) => {
              setTitle(e.target.value)
            
            }}
            required
             />
          </div>
          <div className=' border-2 col-span-1 text-center ml-20 mt-9 rounded-2xl mr-45 text-[#cfb961] pt-1 font-bold text-xl'>
            <select name="departmnet" id=""
            value={departmnet}
            onChange={(e) => {
              setdepartmnet(e.target.value)
            }
            }
            required

            className=''
            >
              <option className='text-[#cfb961]' value="">Choose Department</option>
              <option value="Road">Road</option>
              <option value="sanitation">sanitation</option>
              <option value="Power">Power</option>
            </select>
          </div>

          <div className='col-span-3 text-[#cfb961] ml-8 mt-8 text-xl font-medium '>
            <label htmlFor="description" className='block mb-4'>Description</label>
            <textarea name="" id=""
            value={description}
            onChange={(e) => {
              setdescription(e.target.value)
            }}
            className="resize-none col-span-3 rounded-xl p-2 w-[90%] min-h-[300px] border-2"
            placeholder='Give a Elaborated Description'
            required
            ></textarea>

          </div>

          <div className='col-span-3 flex flex-col gap-y-2 ml-8 text-[#cfb961]'>
                 <label htmlFor="media" className='text-xl font-semibold'>Upload Image/Video (Optional)</label>
                 <label
                   htmlFor="media"
                   className="w-fit cursor-pointer bg-[#F7A072] text-white px-4 py-2 rounded-2xl hover:bg-[#e96d4c] transition"
                 >
                   Browse
                 </label>
               
                 <input
                   id="media"
                   type="file"
                   accept="image/*,video/*"
                   onChange={(e) => setMedia(e.target.files[0])}
                   className="hidden"
                 />
               </div>
               

          <div className='col-span-3 flex justify-center mt-6 mb-10'>
             <button type="submit" className='bg-[#F7A072] px-6 py-2 rounded-2xl text-2xl text-white hover:bg-[#e96d4c] transition'>
                  Submit
            </button>
          </div>


      </form>

    </div>
      
    <Footer />
    </>
  )
}

export default Complaints