import {React, useState} from 'react' 
import Papa from 'papaparse'
import { toast } from 'react-toastify'
function UploadAirdropList() {
    const [fileContent, setFileContent] = useState([])
    const [validFile, setValidFile] = useState(false)

    const validateFile = async (e)=>{
       const fileObj = e.target.files[0]
       const fileType = fileObj.type
       if(fileType == 'text/csv'){
            Papa.parse(fileObj,{
                header:true,
                skipEmptyLines: true, 
                complete: function (results) {
                    console.log(results.data)
                    setFileContent(results.data)
                    setValidFile(true)
                },
            })
       }else{
        setValidFile(false)
        toast.error("Unsupported File. Please upload a CSV file")
        
       }
       
    }
    const submitFile = async ()=>{
        fileContent.map((item, index)=>{
            console.log(item)
        })
    }
  return ( 

        <div className='flex justify-center'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl border-red-200 border-x-2 border-t-2"> 
                <div className="card-body">
                    <h2 className="card-title py-4">Upload Airdrop File</h2>  
                    <form>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Select File</span> 
                        </label>
                        <input type="file" name='airdrop_file' 
                        onChange={(e)=>validateFile(e)}
                        className="input input-accent input-bordered w-full max-w-xs" />  
                    </div> 
                    </form>
                    <div className="card-actions justify-center m-5">
                    <button className="btn btn-primary" 
                    onClick={submitFile}
                    disabled={!validFile}
                    >Update Airdrop List</button>
                    </div>
                </div>
            </div>
        </div> 
  )
}

export default UploadAirdropList