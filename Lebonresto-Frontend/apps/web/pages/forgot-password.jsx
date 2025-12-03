import React from 'react'
import Link from 'next/link'

const bg = '/assets/img/auth-bg.png'

export default function ForgotPassword() {
    return (
        <>
            <section style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#ffe8ee', backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-5 col-lg-7 col-md-9">
                            <div className="authWrap">
                                <div className="authhead">
                                    <div className="text-center mb-4">
                                        <Link href="/" className="text-decoration-none">
                                            <h2 className="text-primary fw-bold">LeBonResto</h2>
                                        </Link>
                                    </div>
                                </div>
                                <div className="authbody d-black mb-4">
                                    <div className="card rounded-4 p-sm-5 p-4 border-0 shadow-lg">
                                        <div className="card-body p-0">
                                            <div className="text-center">
                                                <h1 className="mb-2 fs-2 fw-bold">Mot de passe oublié ?</h1>
                                                <p className="text-muted">Entrez votre email pour réinitialiser votre mot de passe</p>
                                            </div>
                                            <form className="mt-4 text-start">
                                                <div className="form mb-4">
                                                    <div className="form-group mb-4">
                                                        <label className="fw-medium mb-2">Email</label>
                                                        <input type="email" className="form-control" placeholder="nom@exemple.com" required />
                                                    </div>

                                                    <div className="form-group mb-4">
                                                        <button type="submit" className="btn btn-primary w-100 fw-bold py-3 rounded-3">Envoyer le lien</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="authfooter">
                                    <div className="text-center">
                                        <p className="text-dark mb-0">Retour à la <Link href="/login" className="fw-bold text-primary">Connexion</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
