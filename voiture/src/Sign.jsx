import React from "react";

export default function Sign() {
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">CarReflexe</h1>
          <p className="col-lg-10 fs-4">
            Bienvenue sur CarReflexe, Trouvez la Voiture de Vos Rêves : Explorez notre sélection exceptionnelle de voitures d'occasion certifiées, toutes prêtes à vous offrir une expérience de conduite inoubliable. Parcourez notre showroom virtuel et trouvez la voiture d'occasion parfaite qui combine performance, style et fiabilité.
          </p>
        </div>
        <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-light">
            <div className="text-center h2">Sign up</div>
            <div className="py-3" ></div>
          <div class="form-floating mb-3 col-12" >
            <input type="email" class="form-control" style={{height: "60px"}} id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
          </div>
          <div className="py-3"></div>
          <div class="form-floating mb-3 col-12" >
            <input type="email" class="form-control" style={{height: "60px"}} id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Nom utilisateur</label>
          </div>
          <div className="py-3"></div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" style={{height: "60px"}} id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
          <div className="py-2" ></div>
          <button class="w-100 btn btn-lg btn-success" type="submit">Sign up</button>
          <hr class="my-4"/>
          <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </div>
      </div>
    </div>
  );
}
