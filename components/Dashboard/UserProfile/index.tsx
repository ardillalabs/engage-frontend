import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import { HiCamera } from 'react-icons/hi';
import { RootState } from '@/store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUserDetails, updateUserInfoSubmit } from '@/actions/Auth';
import { getCookie } from 'cookies-next';

interface Props {
  updateUserInfoSubmit: (...args: any[]) => any;
  getCurrentUserDetails: (...args: any[]) => any;
  auth: any;
}

const UserProfile = ({
  auth,
  updateUserInfoSubmit,
  getCurrentUserDetails,
}: Props) => {
  const cookie = getCookie('access_token');

  const [pictureUpdate, setPictureUpdate] = useState(false);

  console.log(cookie);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setPictureUpdate(false);
        }
      };
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [profilePicture, setProfilePicture] = useState('');

  const submitImage = (event: any) => {
    console.log(event.target.files[0]);
    setProfilePicture(event.target.files[0]);
  };

  console.log(auth);

  function uploadImage() {
    updateUserInfoSubmit(profilePicture, cookie);
  }

  useEffect(() => {
    if (auth.isUpdatedUserInfo && cookie) {
      getCurrentUserDetails(cookie);
    }
  }, [auth.isLoadingUpdateUserInfo, cookie]);

  useEffect(() => {
    if (!auth.isLoadingUpdateUserInfo && auth.isUpdatedUserInfo) {
      setPictureUpdate(false);
    }
  }, [auth.isLoadingUpdateUserInfo]);

  return (
    <div className={styles.profileView}>
      <div
        className={styles.profilePictureDiv}
        onClick={() => setPictureUpdate(true)}
      >
        {/* Image */}
        <Image
          src={auth.image_url ? auth.image_url : '/dummy450x450.jpg'}
          alt='Profile Picture'
          className={styles.profilePicture}
          width={60}
          height={60}
        />
        <div className={styles.camIconDiv}>
          <HiCamera />
        </div>
      </div>
      {/* DP click popup */}
      <div
        className={
          pictureUpdate ? styles.imageChangeDiv : styles.imageChangeDivHidden
        }
        ref={pictureUpdate ? wrapperRef : null}
      >
        <div className={styles.body1}>Profile Photo</div>
        <div className={styles.imageChangeIconsDiv}>
          <div className={styles.imageChangeIcons}>
            <div className={styles.imageChangeIconDiv}>
              <svg
                width='31'
                height='31'
                viewBox='0 0 31 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M25.0829 24.6398C22.3331 26.7571 18.9564 27.8981 15.4859 27.8828C12.0155 27.8675 8.64897 26.6967 5.91797 24.5552L10.0356 22.625C10.2317 22.5328 10.4199 22.4247 10.5983 22.3017C10.6525 22.2645 10.7067 22.2256 10.7583 22.1849C11.2064 21.842 11.5753 21.4065 11.8397 20.908C12.0396 20.525 12.1725 20.1106 12.2324 19.6827C12.2737 19.4051 12.2946 19.1248 12.295 18.8441C12.295 18.3601 12.2688 17.876 12.2637 17.3912C12.2603 17.1232 12.2575 16.855 12.2552 16.5864L12.4245 16.671L12.8645 16.8987L13.0684 16.9334L15.4277 17.3345L18.0611 17.783L18.1406 20.4908L18.1668 21.376L18.1795 21.8058V21.8321L19.2034 22.2484L25.0829 24.6398Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M18.169 21.6317C17.8781 21.6818 17.5789 21.6354 17.3168 21.4997L12.27 17.3719C12.2641 17.1807 12.259 17.3812 12.2565 17.19C12.2531 16.922 12.2503 16.6538 12.248 16.3853L12.4173 16.4699L12.8573 16.6975L13.0613 16.7322L15.4205 17.1333L18.0539 17.5818L18.1334 20.2897L18.1597 21.1748L18.1724 21.6047V21.6326L18.169 21.6317Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M25.0829 24.6399C22.3331 26.7572 18.9564 27.8982 15.4859 27.8829C12.0155 27.8676 8.64897 26.6968 5.91797 24.5553L10.0356 22.6251C10.2317 22.5329 10.4199 22.4248 10.5983 22.3018C10.6525 22.2646 10.7067 22.2257 10.7583 22.1851C12.7511 23.6033 15.4708 24.4977 17.8233 23.4391C18.3835 23.1853 18.898 22.7757 19.2026 22.2494L25.0829 24.6399Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M23.5673 7.69193C23.5597 7.74185 23.5504 7.79093 23.5394 7.84001C23.4807 8.0916 23.3864 8.33352 23.2593 8.55844L23.2525 8.57029C23.2043 8.65491 23.1527 8.73953 23.0968 8.82415C22.9487 9.04139 22.787 9.24912 22.6128 9.44612L22.5087 9.56205C22.4385 9.64075 22.3674 9.71775 22.2963 9.79391C22.35 9.78241 22.405 9.77927 22.4596 9.7846C22.4799 9.78626 22.5 9.78966 22.5197 9.79476C22.7897 9.85061 23.0207 10.1019 23.0926 10.3871C23.0968 10.4057 23.1011 10.4252 23.1045 10.4438C23.1713 10.8229 23.0198 11.2054 22.8328 11.5439C22.5053 12.143 22.0332 12.5415 21.6177 13.062C21.3063 13.4495 21.1336 13.9082 20.7943 14.2788L20.7689 14.3067L20.7486 14.327C19.8516 15.2511 18.4495 15.4703 17.2792 15.8697C16.856 16.0152 12.2679 17.3184 12.2679 17.6027C12.2679 17.5409 11.8186 17.095 11.2525 16.5526C9.22155 14.6241 8.5539 11.6446 9.76228 9.08902C11.0612 6.33884 14.0111 4.37648 16.8205 3.43381C17.6989 3.13933 18.6957 2.94131 19.5284 3.34919C20.361 3.75706 20.7757 5.02214 20.0852 5.63987C20.5195 5.31128 21.0597 5.15432 21.6024 5.199C22.1037 5.2304 22.5765 5.44304 22.9327 5.79727C23.1316 5.99671 23.2918 6.23144 23.4049 6.48947C23.4514 6.59654 23.4901 6.70683 23.5208 6.81949C23.597 7.10387 23.6128 7.40105 23.5673 7.69193Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M23.5675 7.69215C23.5599 7.74208 23.5506 7.79116 23.5396 7.84024C23.4809 8.09182 23.3866 8.33374 23.2595 8.55867L23.2527 8.57051C23.2045 8.65514 23.1529 8.73976 23.097 8.82438C22.9489 9.04161 22.7872 9.24934 22.613 9.44634L22.5089 9.56227C22.4387 9.64097 22.3676 9.71797 22.2965 9.79413C22.3502 9.78263 22.4053 9.77949 22.4598 9.78482C22.4801 9.78649 22.5002 9.78988 22.5199 9.79498C22.7899 9.85083 23.0209 10.1022 23.0928 10.3873C23.097 10.4059 23.1013 10.4254 23.1047 10.444C23.1715 10.8231 23.02 11.2056 22.833 11.5441C22.5055 12.1432 22.0334 12.5418 21.6179 13.0622C21.3065 13.4498 21.1338 13.9084 20.7945 14.279L20.7691 14.307L20.7488 14.3273C20.4086 13.8694 20.1918 13.3318 20.1192 12.766C19.9745 11.5949 20.0625 10.3188 20.0228 9.13324C20.0092 8.71945 19.9847 8.22611 20.1175 7.83347C20.1539 7.73627 20.2025 7.64413 20.2622 7.5593C20.418 7.30809 20.5955 7.07108 20.7928 6.85102C21.0166 6.61281 21.2991 6.4377 21.6119 6.34329C21.7809 6.29529 21.954 6.26355 22.129 6.24852C22.3161 6.23017 22.5046 6.23387 22.6909 6.25952C22.9393 6.29498 23.1794 6.37435 23.4 6.49392C23.4465 6.60099 23.4853 6.71128 23.5159 6.82394C23.5932 7.10662 23.6108 7.4023 23.5675 7.69215Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M11.422 15.6549C12.2164 15.6549 12.8605 15.0109 12.8605 14.2164C12.8605 13.4219 12.2164 12.7778 11.422 12.7778C10.6275 12.7778 9.9834 13.4219 9.9834 14.2164C9.9834 15.0109 10.6275 15.6549 11.422 15.6549Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M11.8787 15.5043C12.5901 15.5043 13.1667 14.9277 13.1667 14.2164C13.1667 13.5051 12.5901 12.9285 11.8787 12.9285C11.1674 12.9285 10.5908 13.5051 10.5908 14.2164C10.5908 14.9277 11.1674 15.5043 11.8787 15.5043Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M11.8975 12.8623L12.2698 17.6857L17.892 20.9707C18.2809 21.116 18.71 21.1114 19.0957 20.9578C19.4814 20.8042 19.7962 20.5126 19.9788 20.1397C20.7877 18.4829 22.0858 15.8672 21.9149 14.8932C21.661 13.4547 20.984 12.947 20.984 12.947L21.2658 11.2596C21.3716 10.6241 21.5079 9.9607 21.3505 9.32181C21.1702 8.58984 20.6168 8.27674 20.1615 7.72925C18.9633 9.27273 16.9933 10.1452 15.273 11.0295C14.3853 11.4898 11.8975 12.8623 11.8975 12.8623Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M18.2049 12.4478C18.1982 12.4765 19.3355 15.5043 19.3355 15.5043L17.8174 15.5787'
                  stroke='#D9D9D9'
                  strokeWidth='2.18376'
                  strokeMiterlimit='10'
                />
                <path
                  d='M14.6094 11.8613C15.3928 11.6995 16.1985 11.6769 16.9898 11.7945'
                  stroke='#D9D9D9'
                  strokeWidth='2.18376'
                  strokeMiterlimit='10'
                />
                <path
                  d='M19.6064 11.8706C20.0902 11.7588 20.5885 11.7243 21.0831 11.7682'
                  stroke='#D9D9D9'
                  strokeWidth='2.18376'
                  strokeMiterlimit='10'
                />
                <path
                  d='M16.2616 16.4248C16.2732 16.4065 16.2884 16.3908 16.3064 16.3787C16.3243 16.3665 16.3445 16.3582 16.3658 16.3542C16.3871 16.3503 16.409 16.3507 16.4301 16.3556C16.4512 16.3605 16.471 16.3696 16.4884 16.3825C16.6644 16.5061 16.986 16.7684 17.443 16.8589C18.0658 16.9833 18.6056 16.7337 18.7351 16.8945C18.8079 16.985 18.719 17.0959 18.549 17.233C18.3708 17.3664 18.1678 17.4627 17.9518 17.5163C17.7358 17.57 17.5113 17.5798 17.2915 17.5452C16.6924 17.4327 16.2422 16.7388 16.2422 16.4925C16.2429 16.4687 16.2496 16.4454 16.2616 16.4248Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M16.0378 12.8318C16.554 12.836 16.554 13.6247 16.0378 13.6289H16.0141C15.4979 13.6247 15.4979 12.836 16.0141 12.8318H16.0378Z'
                  fill='#D9D9D9'
                />
                <path
                  d='M20.2912 12.7778C20.7701 12.7778 20.7701 13.514 20.2912 13.5174H20.27C19.7902 13.5174 19.7902 12.7812 20.27 12.7778H20.2912Z'
                  fill='#D9D9D9'
                />
              </svg>
            </div>
            <span className='body-4'>Avatar</span>
          </div>
          <label
            htmlFor='profilePictureUpload'
            className={styles.imageChangeIcons}
          >
            <input
              type='file'
              id='profilePictureUpload'
              className={styles.imageChangeInput}
              onChange={submitImage}
            />
            <div className={styles.imageChangeIconDiv}>
              <svg
                width='27'
                height='27'
                viewBox='0 0 27 27'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.0996 8.54957C17.0996 7.05842 18.3084 5.84961 19.7996 5.84961C21.2908 5.84961 22.4995 7.05842 22.4995 8.54957C22.4995 10.0407 21.2908 11.2495 19.7996 11.2495C18.3084 11.2495 17.0996 10.0407 17.0996 8.54957Z'
                  fill='#D9D9D9'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M26.9996 15.7242V9.41746C26.9996 7.72576 26.9108 6.27419 26.6412 5.06128C26.3682 3.83304 25.8923 2.76834 25.0618 1.9378C24.2313 1.10727 23.1666 0.631413 21.9382 0.358447C20.7254 0.0888828 19.2738 0 17.5821 0H9.41746C7.72576 0 6.27419 0.0888828 5.06128 0.358447C3.83304 0.631413 2.76834 1.10727 1.9378 1.9378C1.10727 2.76834 0.631413 3.83304 0.358447 5.06128C0.0888828 6.27419 0 7.72576 0 9.41746V17.5821C0 19.2738 0.0888828 20.7254 0.358447 21.9382C0.631413 23.1666 1.10727 24.2313 1.9378 25.0618C2.76834 25.8923 3.83304 26.3682 5.06128 26.6412C6.27419 26.9108 7.72576 26.9996 9.41746 26.9996H17.5821C19.2738 26.9996 20.7254 26.9108 21.9382 26.6412C23.1666 26.3682 24.2313 25.8923 25.0618 25.0618C25.8923 24.2313 26.3682 23.1666 26.6412 21.9382C26.9108 20.7254 26.9996 19.2738 26.9996 17.5821V15.7869C27.0001 15.766 27.0001 15.7451 26.9996 15.7242ZM2.99409 5.64703C2.78906 6.56961 2.69996 7.78737 2.69996 9.41746V12.2794C3.67177 11.345 4.57644 10.5804 5.4525 10.023C6.51402 9.34749 7.60336 8.93111 8.77791 8.93111C9.95246 8.93111 11.0418 9.34749 12.1034 10.023C13.1516 10.69 14.2408 11.6536 15.437 12.8498L17.6311 15.0439C18.9586 13.9496 20.2602 13.194 21.6612 13.0195C22.5841 12.9045 23.4544 13.0507 24.2996 13.3915V9.41746C24.2996 7.78737 24.2105 6.56961 24.0055 5.64703C23.8039 4.73979 23.5085 4.20285 23.1527 3.84696C22.7967 3.49107 22.2598 3.19573 21.3525 2.99409C20.4301 2.78906 19.2122 2.69996 17.5821 2.69996H9.41746C7.78737 2.69996 6.56961 2.78906 5.64703 2.99409C4.73979 3.19573 4.20285 3.49107 3.84696 3.84696C3.49107 4.20285 3.19573 4.73979 2.99409 5.64703Z'
                  fill='#D9D9D9'
                />
              </svg>
            </div>
            <span className='body-4'>Gallery</span>
          </label>
        </div>

        <div className={styles.buttonDiv}>
          {auth.isLoadingUpdateUserInfo ? (
            <button disabled>Uploading...</button>
          ) : (
            <button onClick={uploadImage}>Upload</button>
          )}
        </div>
      </div>
      <p className={styles.username}>{auth?.username}</p>
    </div>
  );
};

UserProfile.prototype = {
  updateUserInfoSubmit: PropTypes.func.isRequired,
  getCurrentUserDetails: PropTypes.func.isRequired,
};

// export default UserProfile;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateUserInfoSubmit,
  getCurrentUserDetails,
})(UserProfile);
