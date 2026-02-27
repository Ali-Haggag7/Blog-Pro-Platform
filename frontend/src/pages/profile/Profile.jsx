import "./profile.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import swal from "sweetalert"
import UpdateProfileModal from "./UpdateProfileModal"
import { deleteProfile, getUserProfile, uploadProfilePhoto, toggleFollowUser } from "../../redux/apiCalls/profileApiCall"
import PostItem from "../../components/posts/PostItem"
import { Oval } from "react-loader-spinner"
import { logoutUser } from "../../redux/apiCalls/authApiCalls"

const Profile = () => {
    const dispatch = useDispatch()
    const { profile, loading, isProfileDeleted } = useSelector(state => state.profile)
    const { user } = useSelector((state) => state.auth)

    const [file, setFile] = useState(null)
    const [updateProfile, setUpdateProfile] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        if (isProfileDeleted) {
            navigate("/")
        }
    }, [navigate, isProfileDeleted])

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!file) return toast.warning("There is no file selected!")

        const formData = new FormData()
        formData.append('image', file)

        dispatch(uploadProfilePhoto(formData))
    }

    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteProfile(user?._id))
                dispatch(logoutUser())
            }
        })
    }

    const handleFollowToggle = () => {
        dispatch(toggleFollowUser(profile?._id))
    }

    if (loading) {
        return (
            <div className="profile-loader">
                <Oval height={120} width={120} color="#000" visible={true} ariaLabel='oval-loading' secondaryColor="grey" strokeWidth={3} strokeWidthSecondary={3} />
            </div>
        )
    }

    return (
        <section className="profile">
            {/* 1. The Cover Background */}
            <div className="profile-header">
                {/* 2. The Overlapping Info Container */}
                <div className="profile-info-container">
                    <div className="profile-image-wrapper">
                        <img
                            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
                            alt=""
                            className="profile-image"
                        />
                        {user?._id === profile?._id && (
                            <form onSubmit={formSubmitHandler} className="upload-form">
                                <abbr title="choose profile photo">
                                    <label htmlFor="file" className="bi bi-camera-fill upload-profile-photo-icon"></label>
                                </abbr>
                                <input style={{ display: "none" }} type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                                {/* Hidden unless file is selected */}
                                {file && <button className="upload-profile-photo-btn" type="submit">Upload</button>}
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. The Details Below the Cover */}
            <div className="profile-details-wrapper">
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">{profile?.bio}</p>

                <div className="profile-follow-info">
                    <span className="followers-count">Followers: {profile?.followers?.length || 0}</span>
                </div>

                <div className="user-date-joined">
                    <strong>Joined: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>

                {/* 4. Action Buttons Container */}
                <div className="profile-actions">
                    {user?._id === profile?._id ? (
                        <>
                            <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                                <i className="bi bi-pencil-square" style={{ marginRight: "5px" }}></i> Edit Profile
                            </button>
                            <button onClick={deleteAccountHandler} className="delete-account-btn">
                                Delete Account
                            </button>
                        </>
                    ) : (
                        <button onClick={handleFollowToggle} className="follow-toggle-btn">
                            {profile?.followers?.includes(user?._id) ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
            </div>

            {/* 5. User's Posts Section */}
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.username}'s Posts</h2>
                {
                    profile?.posts?.map(post =>
                        <PostItem key={post?._id} post={post} username={profile?.username} userId={profile?._id} />
                    )
                }
            </div>

            {updateProfile && (
                <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />
            )}
        </section>
    )
}

export default Profile