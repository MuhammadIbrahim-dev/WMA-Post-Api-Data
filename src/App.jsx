import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
//--------------------react_icons----------------------------
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import bacground from './assets/Fronted/bacground.mp4'
function App() {

  const [post, setPost] = useState([]);
  const [total,setTotal]=useState('');
  const [limit,setLimit]=useState('');
  const[skip,setSkip]=useState('');
  const FetchData = () => {
    // ---------------------fetchAPI--------------------------
    fetch('https://dummyjson.com/posts/')
      .then((resp) => resp.json())
      .then((data) => {
        setPost(data.posts);
        setTotal(data.total);
        setLimit(data.limit);
        setSkip(data.skip);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    FetchData();
  }, []);


  return (
    <>
      <div className='relative overflow-hidden flex justify-center flex-col items-center'>
        <video src={bacground} autoPlay muted loop playsInline type="video/mp4"  className='absolute z-[-1] h-full top-0 object-cover'></video>
        <h1 className='text-7xl font-bold text-gray-500 py-5'>Posts</h1>
        <div className=' px-4'>
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {post.map((value, index) => (
              <div className='border rounded-lg bg-white bg-opacity-40 p-2 flex flex-col'key={index}>
              <h1 className='font-medium' >{value.title}</h1> 
              <p className='text-[10px] py-2 h-[150px]'>{value.body}</p>
              <div className='flex gap-2 text-sm'>
                {value.tags.map((v,index)=>(
                  <p key={index} className='bg-gray-500 px-2 rounded-full text-white'>
                    {v}
                  </p>
                ))}
              </div>
              {/* --------------------reacttions-section----------------- */}
              <div className='flex gap-2 py-2 text-[10px]' >
             <p className='flex justify-center text-center items- gap-2'><AiFillLike />Likes {value.reactions.likes}</p>
             <p className='flex justify-center text-center items-center gap-2'><BiSolidDislike />dislikes {value.reactions.dislikes}</p>
             <p className='flex justify-center text-center items-center gap-2'><FaRegEye />view {value.views}</p>
             <p className='flex justify-center text-center items-center gap-2'><FaRegUser />userId {value.userId}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
        {/* totals */}
        <div className=' flex gap-2 py-2 text-white'>
          <p> Total: {total}</p>
          <p>Skip: {skip}</p>
          <p>Limit: {limit}</p>
        </div>
      </div>
    </>
  )
}

export default App;
