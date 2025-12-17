import { useParams } from "react-router";
import useCreatefolder from "../hooks/useCreatefolder";
import useUploadfile from "../hooks/useUploadfile";
import { useState,useEffect,useRef } from "react";
import useGetfolder from "../hooks/useGetfolder";
import Item from "../components/Item";
import { useNotification } from "../hooks/useNotification";
import type { AxiosError } from "axios";

const Drive = () => {
  const [file, setFile] = useState<File | null>(null);
  const [foldername, setFoldername] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { parentid } = useParams();
  const { data } = useGetfolder(parentid || "root");

  const { mutate: createFolder,isPending:pendingFolder,isError:folderError,isSuccess: folderSuccess,error: foldererror } = useCreatefolder();
  const { mutate: uploadFile, isPending: pendingFile, isError: fileError,isSuccess: fileSuccess,error: fileerror } = useUploadfile();
  const {add} = useNotification()
  useEffect(()=>{
    if(!pendingFolder && folderError){
        add((foldererror as AxiosError<{msg: string}>)?.response?.data.msg || "An unexpected error occured")
    }
    else if(!pendingFolder && folderSuccess){
      add("Folder created successfully")
    }
  },[pendingFolder,folderError,folderSuccess,foldererror])
  useEffect(()=>{
    if(!pendingFile && fileError){
        add((fileerror as AxiosError<{msg: string}>)?.response?.data.msg || "An unexpected error occured")
    }
    else if(!pendingFile && fileSuccess){
        add("File upload successful")
    }
  },[pendingFile,fileError,fileSuccess,fileerror])
  const submitFolder = (e: any) => {
    e.preventDefault();
    createFolder({ parentid: parentid || "root", name: foldername });
    setFoldername("");
  };

  const submitFile = (e: any) => {
    e.preventDefault();
    if (file) {
      uploadFile({ parentid: parentid || "root", file });
      setFile(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  return (
    <div className="px-6 py-6 flex flex-col gap-8">

      {/* Items Grid */}
      <div className="flex flex-col divide-y rounded-xl overflow-hidden bg-white shadow-md">
        {Array.isArray(data) && data?.map((folder) => (
          <Item key={folder.id} {...folder} />
        ))}
      </div>

      {/* Create & Upload Section */}
      <div className="flex flex-col sm:flex-row gap-6">
        
        {/* Upload File */}
        <form
          onSubmit={submitFile}
          className="p-4 rounded-xl shadow-lg bg-white/70 backdrop-blur-md w-full sm:w-1/2 flex flex-col gap-3"
        >
          <h2 className="font-semibold text-lg">Upload File</h2>
          <input
            type="file"
            ref={fileRef}
            onChange={(e: any) => setFile(e.target.files[0])}
            className="p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </form>

        {/* Create Folder */}
        <form
          onSubmit={submitFolder}
          className="p-4 rounded-xl shadow-lg bg-white/70 backdrop-blur-md w-full sm:w-1/2 flex flex-col gap-3"
        >
          <h2 className="font-semibold text-lg">Create Folder</h2>
          <input
            type="text"
            value={foldername}
            onChange={(e: any) => setFoldername(e.target.value)}
            placeholder="Folder name"
            className="p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Create
          </button>
        </form>

      </div>
    </div>
  );
};

export default Drive;
