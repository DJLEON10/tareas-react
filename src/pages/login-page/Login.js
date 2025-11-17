import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  FacebookAuthProvider, 
  GoogleAuthProvider, 
  linkWithCredential, 
  fetchSignInMethodsForEmail,
  linkWithPopup 
} from "firebase/auth";
import { auth, githubProvider, db } from "../../firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para guardar el método de autenticación y hora de entrada
  const saveAuthMethod = async (userId, method) => {
    try {
      const userRef = doc(db, "usuarios", userId);
      const ahora = new Date().toISOString();
      
      await setDoc(userRef, {
        metodosAuth: arrayUnion(method),
        horaEntrada: ahora,  // Solo guardamos entrada
        horaSalida: null,    // IMPORTANTE: Limpiamos cualquier salida previa
        estadoSesion: "Activa"
      }, { merge: true });
      
    } catch (error) {
      console.error("Error al guardar método de autenticación:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveAuthMethod(userCredential.user.uid, "password");
      navigate("/sidebar");
    } catch (err) {
      console.log(err);
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleAccountExists = async (error) => {
    const email = error.customData?.email;
    const pendingCred = error.credential;

    if (!email) {
      setError("Error desconocido en autenticación");
      return;
    }

    const methods = await fetchSignInMethodsForEmail(auth, email);
    const existingProvider = methods[0];

    let provider;
    if (existingProvider === "google.com") provider = new GoogleAuthProvider();
    if (existingProvider === "facebook.com") provider = new FacebookAuthProvider();
    if (existingProvider === "github.com") provider = githubProvider;

    if (!provider) {
      setError("Ya existe una cuenta con este correo.");
      return;
    }

    const existingResult = await signInWithPopup(auth, provider);
    await linkWithCredential(existingResult.user, pendingCred);

    Swal.fire("Cuentas vinculadas correctamente", "", "success");
    navigate("/sidebar");
  };

const handleGithubLogin = async () => {
  try {
    // Si no hay usuario logueado, intentar login directo
    if (!auth.currentUser) {
      const result = await signInWithPopup(auth, githubProvider);
      await saveAuthMethod(result.user.uid, "github");
      console.log("Inicio de sesión / registro con GitHub:", result.user);
      Swal.fire("Bienvenido", "Inicio de sesión con GitHub exitoso", "success");
      navigate("/sidebar");
      return;
    }

    // Si hay usuario logueado, verificar si GitHub ya está vinculado
    const providerData = auth.currentUser.providerData;
    const isGithubLinked = providerData.some(provider => provider.providerId === "github.com");

    if (isGithubLinked) {
      // Ya está vinculado, solo hacer login
      const result = await signInWithPopup(auth, githubProvider);
      await saveAuthMethod(result.user.uid, "github");
      console.log("Login con GitHub (ya vinculado):", result.user);
      Swal.fire("Bienvenido", "Inicio de sesión con GitHub exitoso", "success");
      navigate("/sidebar");
      return;
    }

    // No está vinculado, vincular ahora
    const linkResult = await linkWithPopup(auth.currentUser, githubProvider);
    await saveAuthMethod(linkResult.user.uid, "github");
    console.log("GitHub vinculado:", linkResult.user);
    Swal.fire("Éxito", "Cuenta de GitHub vinculada", "success");
    navigate("/sidebar");

  } catch (error) {
    console.error("Error GitHub:", error);

    if (error.code === "auth/credential-already-in-use" ||
        error.code === "auth/account-exists-with-different-credential") {

      const login = await signInWithPopup(auth, githubProvider);
      await saveAuthMethod(login.user.uid, "github");
      Swal.fire("Listo", "Inicio de sesión exitoso", "success");
      navigate("/sidebar");
      return;
    }

    Swal.fire("Error", error.message, "error");
  }
};


const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // Si no hay usuario logueado, intentar login directo
    if (!auth.currentUser) {
      const result = await signInWithPopup(auth, provider);
      await saveAuthMethod(result.user.uid, "google");
      console.log("Inicio con Google:", result.user);
      navigate("/sidebar");
      return;
    }

    // Si hay usuario logueado, verificar si Google ya está vinculado
    const providerData = auth.currentUser.providerData;
    const isGoogleLinked = providerData.some(p => p.providerId === "google.com");

    if (isGoogleLinked) {
      // Ya está vinculado, solo hacer login
      const result = await signInWithPopup(auth, provider);
      await saveAuthMethod(result.user.uid, "google");
      console.log("Login con Google (ya vinculado):", result.user);
      navigate("/sidebar");
      return;
    }

    // No está vinculado, vincular ahora
    const linkResult = await linkWithPopup(auth.currentUser, provider);
    await saveAuthMethod(linkResult.user.uid, "google");
    console.log("Google vinculado:", linkResult.user.providerData);
    navigate("/sidebar");

  } catch (error) {
    console.error("Error Google:", error);

    if (error.code === "auth/provider-already-linked") {
      navigate("/sidebar");
      return;
    }

    if (error.code === "auth/credential-already-in-use" ||
        error.code === "auth/account-exists-with-different-credential") {
      const login = await signInWithPopup(auth, provider);
      await saveAuthMethod(login.user.uid, "google");
      navigate("/sidebar");
      return;
    }

    console.error("Error al iniciar sesión con Google:", error);
  }
};


const handleFacebookLogin = async () => {
  const provider = new FacebookAuthProvider();

  try {
    // Si no hay usuario logueado, intentar login directo
    if (!auth.currentUser) {
      const result = await signInWithPopup(auth, provider);
      await saveAuthMethod(result.user.uid, "facebook");
      console.log("Inicio con Facebook:", result.user);
      Swal.fire("Bienvenido", "Inicio de sesión con Facebook exitoso", "success");
      navigate("/sidebar");
      return;
    }

    // Si hay usuario logueado, verificar si Facebook ya está vinculado
    const providerData = auth.currentUser.providerData;
    const isFacebookLinked = providerData.some(p => p.providerId === "facebook.com");

    if (isFacebookLinked) {
      // Ya está vinculado, solo hacer login
      const result = await signInWithPopup(auth, provider);
      await saveAuthMethod(result.user.uid, "facebook");
      console.log("Login con Facebook (ya vinculado):", result.user);
      Swal.fire("Bienvenido", "Inicio de sesión con Facebook exitoso", "success");
      navigate("/sidebar");
      return;
    }

    // No está vinculado, vincular ahora
    const linkResult = await linkWithPopup(auth.currentUser, provider);
    await saveAuthMethod(linkResult.user.uid, "facebook");
    console.log("Facebook vinculado:", linkResult.user.providerData);
    Swal.fire("Éxito", "Cuenta de Facebook vinculada", "success");
    navigate("/sidebar");

  } catch (error) {
    console.error("Error Facebook:", error);

    if (error.code === "auth/provider-already-linked") {
      navigate("/sidebar");
      return;
    }

    if (
      error.code === "auth/account-exists-with-different-credential" ||
      error.code === "auth/credential-already-in-use"
    ) {
      const email = error.customData?.email;

      if (!email) {
        Swal.fire("Error", "No se pudo obtener el correo", "error");
        return;
      }

      const methods = await fetchSignInMethodsForEmail(auth, email);

      let existingProvider;
      if (methods.includes("google.com")) existingProvider = new GoogleAuthProvider();
      else if (methods.includes("github.com")) existingProvider = githubProvider;
      else if (methods.includes("facebook.com")) existingProvider = new FacebookAuthProvider();

      if (!existingProvider) {
        Swal.fire("Error", "No se pudo identificar el proveedor existente", "error");
        return;
      }

      const loginResult = await signInWithPopup(auth, existingProvider);
      await saveAuthMethod(loginResult.user.uid, "facebook");

      if (error.credential) {
        await linkWithCredential(loginResult.user, error.credential);
      }

      Swal.fire("Listo", "Inicio de sesión exitoso", "success");
      navigate("/sidebar");
      return;
    }

    Swal.fire("Error", error.message, "error");
  }
};


  const handleLinkAccount = async (providerType) => {
    try {
      let provider;

      switch (providerType) {
        case "google":
          provider = new GoogleAuthProvider();
          break;
        case "facebook":
          provider = new FacebookAuthProvider();
          break;
        case "github":
          provider = githubProvider;
          break;
        default:
          return;
      }

      const result = await linkWithPopup(auth.currentUser, provider);
      console.log("Proveedores vinculados:", result.user.providerData);
      Swal.fire("Cuenta vinculada correctamente!", "", "success");
    } catch (error) {
      if (error.code === "auth/provider-already-linked") {
        Swal.fire("Error", "Tu cuenta ya está vinculada con este proveedor.", "error");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        Swal.fire(
          "Ya existe una cuenta con ese correo",
          "Inicia sesión con ese proveedor y luego vincula el actual.",
          "info"
        );
      } else {
        Swal.fire("Error al vincular cuenta", error.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf] px-4 sm:px-6 py-8">
      <div className="flex flex-col bg-white/90 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">Inicio de Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a6b]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a6b]"
            />
          </div>

          {error && <p className="text-red-500 text-xs sm:text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="p-4  w-full bg-[#2d7a6b] text-white py-2 sm:py-3 rounded-md hover:bg-[#0d4f4c] transition text-sm sm:text-base font-medium "
          >
            Iniciar Sesión
          </button>

          <div className="mt-3 sm:mt-4 p-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 sm:py-3 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Iniciar con Google</span>
            </button>
          </div>
        </form>

        <div className="mt-3 sm:mt-4 p-4">
          <button
            onClick={handleGithubLogin}
            className="w-full bg-black text-white py-2 sm:py-3 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="fa-brands fa-github text-lg sm:text-xl"></i>
            Ingresar con GitHub
          </button>
        </div>

        <div className="mt-3 sm:mt-4 p-4">
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-[#1877f2] text-white py-2 sm:py-3 rounded-md hover:bg-[#145dbf] transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="fa-brands fa-facebook-f text-base sm:text-lg"></i>
            Iniciar con Facebook
          </button>
        </div>

        <p className="text-center mt-4 sm:mt-5 text-xs sm:text-sm">
          <Link to="/forgotpassword" className="text-[#2d7a6b] font-medium hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/" className="text-[#0d4f4c] font-semibold hover:underline">
            Regístrate con nosotros
          </Link>
        </p>
      </div>
    </div>
  );
}