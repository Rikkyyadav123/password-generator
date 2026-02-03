import {useCallback, useEffect, useState, useRef } from 'react'
// import './App.css'

function App() {
 const [length,setlength] = useState(8)
 const [numberallowed,setnumberallowed] = useState(false)
 const [characterallowed,setcharacterallowed] =useState(false)
 const [password,setpassword] = useState('')
 const passwordref = useRef(null)

  const generatePassword = useCallback(()=>{
     let pass =""
     let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
     if(numberallowed){
      str+="0123456789"
     }
     if(characterallowed){
       str+="!@#$%^&*()_+{}|:<>?-=[];',./`~" 
     }
         for( let i=1;i<=length;i++){
           let char = Math.floor(Math.random()*str.length+1)
           pass+=str.charAt(char)
         }
         setpassword(pass)
    },[characterallowed,length,numberallowed])

    const copypasswordtoclipboard = useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])
   useEffect(()=>{ generatePassword()
},[length,numberallowed,characterallowed,generatePassword])

   

  return (
    
    <>
       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">

    <h1 className="text-2xl font-bold text-center text-indigo-400">
      Password Generator
    </h1>

    <div className="flex gap-2">
      <input
        type="text"
        placeholder= "Password"
        readOnly
        value={password}
        ref = {passwordref}
        className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
  onClick={copypasswordtoclipboard}
  className="
    px-4 py-2 
    bg-indigo-500 
    hover:bg-indigo-600 
    active:bg-indigo-700
    rounded-lg 
    font-semibold 
    text-white
    shadow-md 
    hover:shadow-lg
    active:scale-95
    transition 
    duration-150 
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-400
    focus:ring-offset-2
    focus:ring-offset-gray-900
  "
>
  Copy
</button>

    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={8}
          max={100}
          value={length}
          onChange={(e) => setlength(e.target.value)}
          className="w-full accent-indigo-500 cursor-pointer"
        />
        <label className="text-sm font-medium whitespace-nowrap">
          Length: <span className="text-indigo-400">{length}</span>
        </label>
      </div>
      <div className="flex items-center gap-6 text-sm">

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-indigo-500"
            onClick={()=>setnumberallowed(!numberallowed)}
          />
          Numbers
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-indigo-500"
            onClick={() => setcharacterallowed(!characterallowed)}
          />
          Characters
        </label>

      </div>
    </div>

  </div>
</div>

    </>
  )
}

export default App
