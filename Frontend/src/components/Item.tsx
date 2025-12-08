import useRenameitem from "../hooks/useRenameitem"
import useDeleteitem from "../hooks/useDeleteitem"
import useDownloadfile from "../hooks/useDownloadfile"
import { useNotification } from "../hooks/useNotification"
import { useState, useEffect } from "react"
import type { AxiosError } from "axios"
import { Link } from "react-router"
import { FiTrash2, FiEdit2, FiFolder, FiFile } from "react-icons/fi"

export default function Item({
  id,
  name,
  size,
  uploaded,
  type,
}: {
  id: string
  name: string
  size: number
  uploaded: string
  type: string
}) {
  const { mutate: renameItem, isPending, isError, error, isSuccess } = useRenameitem()
  const {mutate: downloadFile,isPending: pendingDownload , isError: isdownloadError, error: downloadError, isSuccess: downloadSuccess } = useDownloadfile()
  const {
    mutate: deleteItem,
    isPending: pendingDelete,
    isError: isdeleteError,
    error: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteitem()
  const { add } = useNotification()

  const [newname, setNewname] = useState("")
  const [renaming, setRenaming] = useState(false)

  // Rename notifications
  useEffect(() => {
    if (!isPending && isError) {
      add((error as AxiosError<{ msg: string }>)?.response?.data?.msg || "An unexpected error occurred")
    } else if (!isPending && isSuccess) {
      add("Renamed successfully")
      setRenaming(false)
    }
  }, [isPending, isError, error, isSuccess])

  // Delete notifications
  useEffect(() => {
    if (!pendingDelete && isdeleteError) {
      add((deleteError as AxiosError<{ msg: string }>)?.response?.data?.msg || "An unexpected error occurred")
    } else if (!pendingDelete && deleteSuccess) {
      add("Deleted successfully")
    }
  }, [pendingDelete, isdeleteError, deleteSuccess, deleteError])
  useEffect(() => {
    if (!pendingDownload && isdownloadError) {
      add((deleteError as AxiosError<{ msg: string }>)?.response?.data?.msg || "An unexpected error occurred")
    } else if (!pendingDownload && downloadSuccess) {
        
      add("Downloaded successfully")
    }
  }, [pendingDelete, isdownloadError, downloadSuccess, downloadError])
  const submitRename = (e: any) => {
    e.preventDefault()
    renameItem({ id, name: newname })
  }

  const submitDelete = (e: any) => {
    e.preventDefault()
    deleteItem({ id })
  }
  const submitDownload = (e: any) => {
    e.preventDefault()
    downloadFile({id})
  }
  let formattedDate = ""
  try {
    formattedDate = new Date(uploaded).toLocaleDateString()
  } catch {
    formattedDate = uploaded
  }

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">

      {/* Left Section */}
      <div className="flex items-center gap-4 w-1/2">

        {/* Icon */}
        <div className="text-gray-600">
          {type === "folder" ? <FiFolder size={22} /> : <FiFile size={22} />}
        </div>

        {/* Name section */}
        <div className="flex flex-col">
          {!renaming ? (
            type === "folder" ? (
              <Link
                to={`/drive/${id}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {name}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{name}</span>
            )
          ) : (
            <form onSubmit={submitRename} className="flex items-center gap-2">
              <input
                type="text"
                className="border rounded-lg px-2 py-1 text-sm w-48 focus:ring-2 focus:ring-blue-500"
                value={newname}
                onChange={(e) => setNewname(e.target.value)}
              />

              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setRenaming(false)
                  setNewname("")
                }}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Middle: Metadata */}
      <div className="flex flex-col text-sm text-gray-500 w-1/4">
        <span>Uploaded: {formattedDate}</span>
        {type !== "folder" && (
          <span>{(size / 1024).toFixed(1)} KB</span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 w-1/4 justify-end">

        {/* Download button (file only) */}
        {type === "file" && (
          <button
            onClick={submitDownload}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Download
          </button>
        )}

        {/* Rename */}
        {!renaming && (
          <button
            onClick={() => {
              setRenaming(true)
              setNewname(name)
            }}
            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
          >
            <FiEdit2 size={18} />
          </button>
        )}

        {/* Delete */}
        <form onSubmit={submitDelete}>
          <button
            type="submit"
            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
          >
            <FiTrash2 size={18} />
          </button>
        </form>

      </div>
    </div>
  )
}
