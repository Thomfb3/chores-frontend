import defaultProfileImage from '../assets/images/default-profile-pic.gif';

export const determineProfilePic = (user) => {
    if (typeof user !== 'object' || user === null) {
        return defaultProfileImage;
    }
    return (user.profileImage === "defaultProfile.jpg")
    ? defaultProfileImage
    : user.profileImage;
}
