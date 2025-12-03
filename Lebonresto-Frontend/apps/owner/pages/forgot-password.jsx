import React from 'react'
const bg = '/assets/img/auth-bg.png'
const logo = '/assets/img/icon.png'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <section style={{backgroundImage:`url(${bg})`, backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundColor:'#ffe8ee' , backgroundSize:'cover', height:'100vh'}}>
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-xl-5 col-lg-7 col-md-9">
                    <div className="authWrap">
                        <div className="authhead">
                            <div className="text-center mb-4"><Link href="/"><img className="img-fluid" src={logo} width="55" alt="logo"/></Link></div>
                        </div>
                        <div className="authbody d-black mb-4">
                            <div className="card rounded-4 p-sm-5 p-4">
                                <div className="card-body p-0">
                                    <div className="text-center">
                                        <h1 className="mb-2 fs-2">Forgot Password?</h1>
                                        <p className="mb-0">Enter the email address associated with an account.</p>
                                    </div>
                                    <form className="mt-4 text-start">
                                        <div className="form py-4">
                                            <div className="form-group form-border">
                                                <label className="form-label">Enter email or user</label>
                                                <input type="email" className="form-control" placeholder="name@example.com"/>
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary full-width fw-medium">Reset Password</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="authfooter">
                            <div className="text-center"><p className="text-dark mb-0">Back to<Link href="/register" className="fw-medium text-primary">  Sign In</Link></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
