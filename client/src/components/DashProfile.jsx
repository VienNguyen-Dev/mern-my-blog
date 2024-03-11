import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [updateUserError, setupdateUserError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadUserSuccess, setUploadUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const imagePickerRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read,
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setimageFileUploading(true);
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Could not upload image (Image have must less than 2MB)");
        setImageFile(null);
        setImageFileUrl(null);
        setImageUploadProgress(null);
        setimageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({
            ...formData,
            profilePicture: downloadUrl,
          });
          setimageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setupdateUserError(null);
    setUploadUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setupdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setupdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setupdateUserError(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUploadUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setImageUploadError(data.message);
    }
  };

  const hanldeDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" max-w-lg mx-auto w-full p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={imagePickerRef} hidden />
        <div className=" relative w-32 h-32 shadow-lg overflow-hidden rounded-full self-center cursor-pointer" onClick={() => imagePickerRef.current.click()}>
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100}) `,
                },
              }}
            />
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className=" rounded-full border-8 border-[lightgray] object-cover w-full h-full" />
        </div>
        {imageUploadError && <Alert color={"failure"}>{imageUploadError}</Alert>}
        {error && <Alert color={"failure"}>{error}</Alert>}
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline disabled={loading || imageFileUploading}>
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button gradientDuoTone={"purpleToPink"} className="w-full">
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer hover:underline" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className=" cursor-pointer hover:underline" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {uploadUserSuccess && (
        <Alert color={"success"} className="mt-5">
          {uploadUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color={"failure"} className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} size={"md"} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-200 mb-4" />
              <h3 className="text-lg text-gray-500 dark:text-gray-400 font-normal mb-5">Are you sure you want to delete your account?</h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={hanldeDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
