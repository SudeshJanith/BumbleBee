import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import AxiosClient from '../AxiosClient';
// import axios from 'axios';
// import cookie from 'js-cookie';

const CustomerProfile = () => {

    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    useEffect(() => {
        AxiosClient.post("auth/me").then(res => {
            setCurrentUser(res.data.user);
        })
            .catch(e =>
                // setError(e.response.data.message)
                console.log(e)
            );
    }, [])

    const [fullName, setFullName] = useState(currentUser.name || '');
    const [email, setEmail] = useState(currentUser.email || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const hadleSignOut = (e) => {
        e.preventDefault();
        AxiosClient.post("auth/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });

    }

    const handleProfileInfoForm = (ev) => {
        ev.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/api/customer/profile/update',
            data: {
                user_id: currentUser.id,
                fullName: fullName || currentUser.name,
                email: email || currentUser.email,
            },
            success: function (response) {
                console.log("Success");
                console.log(response);
                if (response.status == 'success') {
                    Swal.fire({
                        toast: true,
                        position: 'bottom-end',
                        icon: 'success',
                        title: response.message,
                        text: 'Wait for the page reload.',
                        showConfirmButton: false,
                        timer: 3500
                    });

                } else {
                    Swal.fire({
                        toast: true,
                        position: 'bottom-end',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 3500
                    })
                }

                //close alert
                Swal.hideLoading();

                // Delay page reload untile the sweet alert is closed
                setTimeout(function () {
                    location.reload();
                }, 4000);
            },
            error: function (response) {
                console.log("error");
                console.log(response);

                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    icon: 'error',
                    title: "Something went wrong!",
                    showConfirmButton: false,
                    timer: 3500
                });
                //close alert
                Swal.hideLoading();
            }
        });

    }

    const handlePasswordInfoForm = (ev) => {
        ev.preventDefault();
        console.log("Clicked");
        if (password == '' || passwordConfirmation == '') {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'warning',
                title: "Please fill the empty fields!.",
                showConfirmButton: false,
                timer: 3500
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8000/api/password/update',
                data: {
                    user_id: currentUser.id,
                    password: password,
                    password_confirmation: passwordConfirmation,
                },
                success: function (response) {
                    // console.log("Success");
                    // console.log(response);
                    if (response.status == 'success') {
                        Swal.fire({
                            toast: true,
                            position: 'bottom-end',
                            icon: 'success',
                            title: response.message,
                            text: 'Wait for the page reload.',
                            showConfirmButton: false,
                            timer: 3500
                        });

                    } else {
                        Swal.fire({
                            toast: true,
                            position: 'bottom-end',
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 3500
                        })
                    }

                    //close alert
                    Swal.hideLoading();

                    // Delay page reload untile the sweet alert is closed
                    setTimeout(function () {
                        location.reload();
                    }, 4000);
                },
                error: function (err) {
                    // console.log("error");
                    // console.log(err.responseJSON.status);

                    // if (condition) {
                    Swal.fire({
                        toast: true,
                        position: 'bottom-end',
                        icon: err.responseJSON.status,
                        title: err.responseJSON.message,
                        showConfirmButton: false,
                        timer: 3500
                    });
                    // }
                    //close alert
                    Swal.hideLoading();

                }
            });
        }

    }

    if (!userToken) {
        return <Navigate to='/' />
    }

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                    <div className="app-brand demo">
                        <a href="index.html" className="app-brand-link">
                            <span className="app-brand-logo demo">
                                <svg
                                    width="25"
                                    viewBox="0 0 25 42"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                >
                                    <defs>
                                        <path
                                            d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                                            id="path-1"
                                        ></path>
                                        <path
                                            d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                                            id="path-3"
                                        ></path>
                                        <path
                                            d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                                            id="path-4"
                                        ></path>
                                        <path
                                            d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                                            id="path-5"
                                        ></path>
                                    </defs>
                                    <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                                        <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                                            <g id="Icon" transform="translate(27.000000, 15.000000)">
                                                <g id="Mask" transform="translate(0.000000, 8.000000)">
                                                    <mask id="mask-2" fill="white">
                                                        <use xlinkHref="#path-1"></use>
                                                    </mask>
                                                    <use fill="#696cff" xlinkHref="#path-1"></use>
                                                    <g id="Path-3" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-3"></use>
                                                        <use fill-pacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                                                    </g>
                                                    <g id="Path-4" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-4"></use>
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                                                    </g>
                                                </g>
                                                <g
                                                    id="Triangle"
                                                    transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                                                >
                                                    <use fill="#696cff" xlinkHref="#path-5"></use>
                                                    <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                            <span className="app-brand-text demo menu-text fw-bolder ms-2">BumbleBee</span>
                        </a>

                        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                            <i className="bx bx-chevron-left bx-sm align-middle"></i>
                        </a>
                    </div>

                    <div className="menu-inner-shadow"></div>

                    <ul className="menu-inner py-1">
                        {/* <!-- Dashboard --> */}
                        <li className="menu-item">
                            <Link to="/customer/dashboard" className="menu-link">
                                <i className="menu-icon tf-icons bx bxs-dashboard"></i>
                                <div data-i18n="Analytics">Dashboard</div>
                            </Link>
                        </li>

                        <li className="menu-item active">
                            <Link to="/customer/profile" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-user"></i>
                                <div data-i18n="Analytics">Profile</div>
                            </Link>
                        </li>
                    </ul>
                </aside>
                {/* <!-- / Menu --> */}

                {/* <!-- Layout container --> */}
                <div className="layout-page">
                    {/* <!-- Navbar --> */}

                    <nav
                        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                        id="layout-navbar"
                    >
                        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                            <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                                <i className="bx bx-menu bx-sm"></i>
                            </a>
                        </div>

                        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                            {/* <!-- Search --> */}
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center">
                                    <i className="bx bx-search fs-4 lh-0"></i>
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search..."
                                        aria-label="Search..."
                                    />
                                </div>
                            </div>
                            {/* <!-- /Search --> */}

                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                {/* <!-- Place this tag where you want the button to render. --> */}


                                {/* <!-- User --> */}
                                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                        <div className="avatar avatar-online">
                                            <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 me-3">
                                                        <div className="avatar avatar-online">
                                                            <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <span className="fw-semibold d-block">{currentUser.name}</span>
                                                        <small className="text-muted">Admin</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/customer/profile">
                                                <i className="bx bx-user me-2"></i>
                                                <span className="align-middle">My Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/admin/dashboard">
                                                <i className="bx bxs-dashboard me-2"></i>
                                                <span className="align-middle">Dashboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={hadleSignOut}>
                                                <i className="bx bx-power-off me-2"></i>
                                                <span className="align-middle">Log Out</span>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                {/* <!--/ User --> */}
                            </ul>
                        </div>
                    </nav>

                    {/* <!-- / Navbar --> */}

                    {/* <!-- Content wrapper --> */}
                    <div className="content-wrapper">
                        {/* <!-- Content --> */}

                        <div class="container-xxl flex-grow-1 container-p-y">

                            {/* <!-- Basic Layout & Basic with Icons --> */}
                            <div class="row">
                                {/* <!-- Basic Layout --> */}
                                <div class="col-xxl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Profile Info</h5>
                                            {/* <small class="text-muted float-end">Default label</small> */}
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={handleProfileInfoForm}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Name</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" id="basic-default-name" onChange={(e) => setFullName(e.target.value)} defaultValue={currentUser.name} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Email</label>
                                                    <div class="col-sm-10">
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="email"
                                                                id="basic-default-email"
                                                                class="form-control"
                                                                placeholder="john.doe"
                                                                aria-label="john.doe"
                                                                aria-describedby="basic-default-email2"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                defaultValue={currentUser.email}
                                                            />
                                                            <span class="input-group-text" id="basic-default-email2">@example.com</span>
                                                        </div>
                                                        {/* <div class="form-text">You can use letters, numbers & periods</div> */}
                                                    </div>
                                                </div>
                                                {/* <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-phone">Date of Birth</label>
                                                    <div class="col-sm-10">
                                                        <input
                                                            type="text"
                                                            id="basic-default-phone"
                                                            class="form-control phone-mask"
                                                            placeholder="658 799 8941"
                                                            aria-label="658 799 8941"
                                                            aria-describedby="basic-default-phone"
                                                        // value={customerData.date_of_birth}
                                                        />
                                                    </div>
                                                </div> */}
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary">Update Profile Info</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Basic with Icons --> */}

                            </div>
                            <div class="row">
                                {/* <!-- Basic Layout --> */}
                                <div class="col-xxl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Change Password</h5>
                                            {/* <small class="text-muted float-end">Default label</small> */}
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={handlePasswordInfoForm}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-password">Password</label>
                                                    <div class="col-sm-10">
                                                        <input type="password" class="form-control" id="basic-default-password" onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-password-confirmation">Confirm Password</label>
                                                    <div class="col-sm-10">
                                                        <input type="password" class="form-control" id="basic-default-password-confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary">Update Password info</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Basic with Icons --> */}

                            </div>
                        </div>
                        {/* <!-- / Content -->

                        <!-- Footer --> */}

                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>

            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    )
}

export default CustomerProfile
